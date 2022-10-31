using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using TicketBook.Models;
using TicketBook.Repositories.Interfaces;

namespace TicketBook.Repositories
{
    public class AttendedEventRepository : BaseRepository, IAttendedEventRepository
    {
        public AttendedEventRepository(IConfiguration config) : base(config) { }

        public List<AttendedEvent> GetAllAttendedEvents()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT ae.Id, ae.UserId, ae.HomeTeamId, ae.HomeTeamScore, ae.AwayTeamId, ae.AwayTeamScore,
                                               ae.StadiumId, ae.Date AS EventDate, ae.Section, ae.Row, ae.Seat, ae.Overtime,
                                               ae.LengthOfOvertime, ae.Notes, u.FirstName, u.LastName, u.Email, u.FirebaseUserId,
                                               l.Name AS LeagueName, l.Abbreviation AS LeagueAbbreviation, l.Logo AS LeagueLogo, l.SportId,
                                               ht.Name AS HomeTeamName, ht.Abbreviation AS HomeTeamAbbreviation, 
                                               ht.Location AS HomeTeamLocation, ht.Logo AS HomeTeamLogo, ht.LeagueId, 
                                               awt.Name AS AwayTeamName, awt.Abbreviation AS AwayTeamAbbreviation, 
                                               awt.Location AS AwayTeamLocation, awt.Logo AS AwayTeamLogo, awt.LeagueId, 
                                               st.Name AS StadiumName, st.Location AS StadiumLocation, st.TeamId AS StadiumHomeTeam, 
                                               st.FirstGameDate AS StadiumFirstGameDate, st.LastGameDate AS StadiumLastGameDate
                                          FROM AttendedEvent ae
                                     LEFT JOIN [User] u ON u.Id = ae.UserId
                                     LEFT JOIN Team ht ON ht.Id = ae.HomeTeamId
                                     LEFT JOIN League l on l.Id = ht.LeagueId
                                     LEFT JOIN Team awt ON awt.Id = ae.AwayTeamId
                                     LEFT JOIN Stadium st ON st.Id = ae.StadiumId
                                      ORDER BY ae.Date DESC";
                    var reader = cmd.ExecuteReader();

                    var events = new List<AttendedEvent>();

                    while (reader.Read())
                    {
                        events.Add(ReadAttendedEvent(reader));
                    }

                    reader.Close();

                    return events;
                }
            }
        }

        public List<AttendedEvent> GetCurrentUsersEvents(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT ae.Id, ae.UserId, ae.HomeTeamId, ae.HomeTeamScore, ae.AwayTeamId, ae.AwayTeamScore,
                                               ae.StadiumId, ae.Date AS EventDate, ae.Section, ae.Row, ae.Seat, ae.Overtime,
                                               ae.LengthOfOvertime, ae.Notes, u.FirstName, u.LastName, u.Email, u.FirebaseUserId,
                                               l.Name AS LeagueName, l.Abbreviation AS LeagueAbbreviation, l.Logo AS LeagueLogo, l.SportId,
                                               ht.Name AS HomeTeamName, ht.Abbreviation AS HomeTeamAbbreviation, 
                                               ht.Location AS HomeTeamLocation, ht.Logo AS HomeTeamLogo, ht.LeagueId, 
                                               awt.Name AS AwayTeamName, awt.Abbreviation AS AwayTeamAbbreviation, 
                                               awt.Location AS AwayTeamLocation, awt.Logo AS AwayTeamLogo, awt.LeagueId, 
                                               st.Name AS StadiumName, st.Location AS StadiumLocation, st.TeamId AS StadiumHomeTeam, 
                                               st.FirstGameDate AS StadiumFirstGameDate, st.LastGameDate AS StadiumLastGameDate
                                          FROM AttendedEvent ae
                                     LEFT JOIN [User] u ON u.Id = ae.UserId
                                     LEFT JOIN Team ht ON ht.Id = ae.HomeTeamId
                                     LEFT JOIN League l on l.Id = ht.LeagueId
                                     LEFT JOIN Team awt ON awt.Id = ae.AwayTeamId
                                     LEFT JOIN Stadium st ON st.Id = ae.StadiumId
                                         WHERE ae.UserId = @userId
                                      ORDER BY ae.Date DESC";
                    cmd.Parameters.AddWithValue("@userId", userId);
                    var reader = cmd.ExecuteReader();

                    var events = new List<AttendedEvent>();

                    while (reader.Read())
                    {
                        events.Add(ReadAttendedEvent(reader));
                    }

                    reader.Close();

                    return events;
                }
            }
        }

        public AttendedEvent GetAttendedEventById(int eventId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT ae.Id, ae.UserId, ae.HomeTeamId, ae.HomeTeamScore, ae.AwayTeamId, ae.AwayTeamScore,
                                               ae.StadiumId, ae.Date AS EventDate, ae.Section, ae.Row, ae.Seat, ae.Overtime,
                                               ae.LengthOfOvertime, ae.Notes, u.FirstName, u.LastName, u.Email, u.FirebaseUserId,
                                               l.Name AS LeagueName, l.Abbreviation AS LeagueAbbreviation, l.Logo AS LeagueLogo, l.SportId,
                                               ht.Name AS HomeTeamName, ht.Abbreviation AS HomeTeamAbbreviation, 
                                               ht.Location AS HomeTeamLocation, ht.Logo AS HomeTeamLogo, ht.LeagueId, 
                                               awt.Name AS AwayTeamName, awt.Abbreviation AS AwayTeamAbbreviation, 
                                               awt.Location AS AwayTeamLocation, awt.Logo AS AwayTeamLogo, awt.LeagueId, 
                                               st.Name AS StadiumName, st.Location AS StadiumLocation, st.TeamId AS StadiumHomeTeam, 
                                               st.FirstGameDate AS StadiumFirstGameDate, st.LastGameDate AS StadiumLastGameDate
                                          FROM AttendedEvent ae
                                     LEFT JOIN [User] u ON u.Id = ae.UserId
                                     LEFT JOIN Team ht ON ht.Id = ae.HomeTeamId
                                     LEFT JOIN League l on l.Id = ht.LeagueId
                                     LEFT JOIN Team awt ON awt.Id = ae.AwayTeamId
                                     LEFT JOIN Stadium st ON st.Id = ae.StadiumId
                                         WHERE ae.Id = @id";

                    cmd.Parameters.AddWithValue("@id", eventId);
                    var reader = cmd.ExecuteReader();

                    AttendedEvent attendedEvent = null;

                    if (reader.Read())
                    {
                        attendedEvent = ReadAttendedEvent(reader);
                    }

                    reader.Close();

                    return attendedEvent;
                }
            }
        }

        public void AddAttendedEvent(AttendedEvent attendedEvent)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO AttendedEvent(
                            UserId, HomeTeamId, AwayTeamId, HomeTeamScore, AwayTeamScore, StadiumId, 
                            Date, Section, Row, Seat, Overtime, LengthOfOverTime, Notes )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @UserId, @HomeTeamId, @AwayTeamId, @HomeTeamScore, @AwayTeamScore, @StadiumId, 
                            @Date, @Section, @Row, @Seat, @Overtime, @LengthOfOverTime, @Notes )";
                    cmd.Parameters.AddWithValue("@UserId", attendedEvent.UserId);
                    cmd.Parameters.AddWithValue("@HomeTeamId", attendedEvent.HomeTeamId);
                    cmd.Parameters.AddWithValue("@AwayTeamId", attendedEvent.AwayTeamId);
                    cmd.Parameters.AddWithValue("@HomeTeamScore", attendedEvent.HomeTeamScore);
                    cmd.Parameters.AddWithValue("@AwayTeamScore", attendedEvent.AwayTeamScore);
                    cmd.Parameters.AddWithValue("@StadiumId", attendedEvent.StadiumId);
                    cmd.Parameters.AddWithValue("@Date", attendedEvent.Date);
                    cmd.Parameters.AddWithValue("@Section", attendedEvent.Section);
                    cmd.Parameters.AddWithValue("@Row", attendedEvent.Row);
                    cmd.Parameters.AddWithValue("@Seat", attendedEvent.Seat);
                    cmd.Parameters.AddWithValue("@Overtime", attendedEvent.Overtime);
                    cmd.Parameters.AddWithValue("@Notes", attendedEvent.Notes);

                    // nullable columns
                    if (attendedEvent.LengthOfOvertime == null)
                    {
                        cmd.Parameters.AddWithValue("@LengthOfOvertime", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@LengthOfOvertime", attendedEvent.LengthOfOvertime);
                    }

                    attendedEvent.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteAttendedEvent(int eventId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM AttendedEvent
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", eventId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateAttendedEvent(AttendedEvent attendedEvent)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE AttendedEvent
                            SET UserId = @UserId, 
                                HomeTeamId = @HomeTeamId,
                                AwayTeamId = @AwayTeamId,
                                HomeTeamScore = @HomeTeamScore,
                                AwayTeamScore = @AwayTeamScore, 
                                StadiumId = @StadiumId, 
                                Date = @Date, 
                                Section = @Section, 
                                Row = @Row, 
                                Seat = @Seat, 
                                Overtime = @Overtime, 
                                LengthOfOverTime = @LengthOfOverTime, 
                                Notes = @Notes
                            WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", attendedEvent.Id);
                    cmd.Parameters.AddWithValue("@UserId", attendedEvent.UserId);
                    cmd.Parameters.AddWithValue("@HomeTeamId", attendedEvent.HomeTeamId);
                    cmd.Parameters.AddWithValue("@AwayTeamId", attendedEvent.AwayTeamId);
                    cmd.Parameters.AddWithValue("@HomeTeamScore", attendedEvent.HomeTeamScore);
                    cmd.Parameters.AddWithValue("@AwayTeamScore", attendedEvent.AwayTeamScore);
                    cmd.Parameters.AddWithValue("@StadiumId", attendedEvent.StadiumId);
                    cmd.Parameters.AddWithValue("@Date", attendedEvent.Date);
                    cmd.Parameters.AddWithValue("@Section", attendedEvent.Section);
                    cmd.Parameters.AddWithValue("@Row", attendedEvent.Row);
                    cmd.Parameters.AddWithValue("@Seat", attendedEvent.Seat);
                    cmd.Parameters.AddWithValue("@Overtime", attendedEvent.Overtime);
                    cmd.Parameters.AddWithValue("@LengthOfOvertime", attendedEvent.LengthOfOvertime);
                    cmd.Parameters.AddWithValue("@Notes", attendedEvent.Notes);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public AttendedEvent ReadAttendedEvent(SqlDataReader reader)
        {
            return new AttendedEvent()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                User = new User()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId"))
                },
                HomeTeamId = reader.GetInt32(reader.GetOrdinal("HomeTeamId")),
                HomeTeam = new Team()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("HomeTeamId")),
                    Name = reader.GetString(reader.GetOrdinal("HomeTeamName")),
                    Abbreviation = reader.GetString(reader.GetOrdinal("HomeTeamAbbreviation")),
                    Location = reader.GetString(reader.GetOrdinal("HomeTeamLocation")),
                    Logo = reader.GetString(reader.GetOrdinal("HomeTeamLogo")),
                    LeagueId = reader.GetInt32(reader.GetOrdinal("LeagueId")),
                    League = new League()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("LeagueId")),
                        Name = reader.GetString(reader.GetOrdinal("LeagueName")),
                        Abbreviation = reader.GetString(reader.GetOrdinal("LeagueAbbreviation")),
                        Logo = reader.GetString(reader.GetOrdinal("LeagueLogo")),
                        SportId = reader.GetInt32(reader.GetOrdinal("SportId"))
                    },
                },
                HomeTeamScore = reader.GetInt32(reader.GetOrdinal("HomeTeamScore")),
                AwayTeamId = reader.GetInt32(reader.GetOrdinal("AwayTeamId")),
                AwayTeam = new Team()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("AwayTeamId")),
                    Name = reader.GetString(reader.GetOrdinal("AwayTeamName")),
                    Abbreviation = reader.GetString(reader.GetOrdinal("AwayTeamAbbreviation")),
                    Location = reader.GetString(reader.GetOrdinal("AwayTeamLocation")),
                    Logo = reader.GetString(reader.GetOrdinal("AwayTeamLogo")),
                    LeagueId = reader.GetInt32(reader.GetOrdinal("LeagueId")),
                },
                AwayTeamScore = reader.GetInt32(reader.GetOrdinal("AwayTeamScore")),
                StadiumId = reader.GetInt32(reader.GetOrdinal("StadiumId")),
                Stadium = new Stadium()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("StadiumId")),
                    Name = reader.GetString(reader.GetOrdinal("StadiumName")),
                    Location = reader.GetString(reader.GetOrdinal("StadiumLocation")),
                    TeamId = reader.GetInt32(reader.GetOrdinal("StadiumHomeTeam")),
                    FirstGameDate = reader.GetDateTime(reader.GetOrdinal("StadiumFirstGameDate")),
                    LastGameDate = reader.IsDBNull(reader.GetOrdinal("StadiumLastGameDate"))
                                   ? null : reader.GetDateTime(reader.GetOrdinal("StadiumLastGameDate"))
                },
                Date = reader.GetDateTime(reader.GetOrdinal("EventDate")),
                Section = reader.GetString(reader.GetOrdinal("Section")),
                Row = reader.GetString(reader.GetOrdinal("Row")),
                Seat = reader.GetString(reader.GetOrdinal("Seat")),
                Overtime = reader.GetBoolean(reader.GetOrdinal("Overtime")),
                LengthOfOvertime = reader.IsDBNull(reader.GetOrdinal("LengthOfOvertime"))
                                   ? null : reader.GetString(reader.GetOrdinal("LengthOfOvertime")),
                Notes = reader.GetString(reader.GetOrdinal("Notes")),
            };
        }
    }
}

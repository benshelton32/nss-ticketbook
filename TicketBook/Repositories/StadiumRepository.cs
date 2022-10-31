using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using TicketBook.Models;
using TicketBook.Repositories.Interfaces;

namespace TicketBook.Repositories
{
    public class StadiumRepository : BaseRepository, IStadiumRepository
    {
        public StadiumRepository(IConfiguration config) : base(config) { }

        public List<Stadium> GetAllStadiums()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT s.Id, s.Name, s.Location, s.TeamId, s.FirstGameDate AS StadiumFirstGameDate, 
                                               s.LastGameDate AS StadiumLastGameDate, ht.Name AS HomeTeamName, 
                                               ht.Abbreviation AS HomeTeamAbbreviation, ht.Location AS HomeTeamLocation, 
                                               ht.Logo AS HomeTeamLogo, ht.LeagueId, l.Name AS LeagueName, 
                                               l.Abbreviation AS LeagueAbbreviation, l.Logo AS LeagueLogo, l.SportId
                                          FROM Stadium s
                                     LEFT JOIN Team ht ON ht.Id = s.TeamId
                                     LEFT JOIN League l on l.Id = ht.LeagueId
                                      ORDER BY s.Name";
                    var reader = cmd.ExecuteReader();

                    var stadiums = new List<Stadium>();

                    while (reader.Read())
                    {
                        stadiums.Add(ReadStadium(reader));
                    }

                    reader.Close();

                    return stadiums;
                }
            }
        }

        public Stadium GetStadiumById(int stadiumId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT s.Id, s.Name, s.Location, s.TeamId, s.FirstGameDate AS StadiumFirstGameDate, 
                                               s.LastGameDate AS StadiumLastGameDate, ht.Name AS HomeTeamName, 
                                               ht.Abbreviation AS HomeTeamAbbreviation, ht.Location AS HomeTeamLocation, 
                                               ht.Logo AS HomeTeamLogo, ht.LeagueId, l.Name AS LeagueName, 
                                               l.Abbreviation AS LeagueAbbreviation, l.Logo AS LeagueLogo, l.SportId
                                          FROM Stadium s
                                     LEFT JOIN Team ht ON ht.Id = s.TeamId
                                     LEFT JOIN League l on l.Id = ht.LeagueId
                                         WHERE s.Id = @stadiumId";
                    cmd.Parameters.AddWithValue("@stadiumId", stadiumId);
                    var reader = cmd.ExecuteReader();

                    Stadium stadium = null;

                    if (reader.Read())
                    {
                        stadium = ReadStadium(reader);
                    }

                    reader.Close();

                    return stadium;
                }
            }
        }

        public Stadium GetStadiumByHomeTeamId(int homeTeamId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT s.Id, s.Name, s.Location, s.TeamId, s.FirstGameDate AS StadiumFirstGameDate, 
                                               s.LastGameDate AS StadiumLastGameDate, ht.Name AS HomeTeamName, 
                                               ht.Abbreviation AS HomeTeamAbbreviation, ht.Location AS HomeTeamLocation, 
                                               ht.Logo AS HomeTeamLogo, ht.LeagueId, l.Name AS LeagueName, 
                                               l.Abbreviation AS LeagueAbbreviation, l.Logo AS LeagueLogo, l.SportId
                                          FROM Stadium s
                                     LEFT JOIN Team ht ON ht.Id = s.TeamId
                                     LEFT JOIN League l on l.Id = ht.LeagueId
                                         WHERE s.TeamId = @homeTeamId";
                    cmd.Parameters.AddWithValue("@homeTeamId", homeTeamId);
                    var reader = cmd.ExecuteReader();

                    Stadium stadium = null;

                    if (reader.Read())
                    {
                        stadium = ReadStadium(reader);
                    }

                    reader.Close();

                    return stadium;
                }
            }
        }

        public List<Stadium> GetStadiumsByLeagueId(int leagueId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT s.Id, s.Name, s.Location, s.TeamId, s.FirstGameDate AS StadiumFirstGameDate, 
                                               s.LastGameDate AS StadiumLastGameDate, ht.Name AS HomeTeamName, 
                                               ht.Abbreviation AS HomeTeamAbbreviation, ht.Location AS HomeTeamLocation, 
                                               ht.Logo AS HomeTeamLogo, ht.LeagueId, l.Name AS LeagueName, 
                                               l.Abbreviation AS LeagueAbbreviation, l.Logo AS LeagueLogo, l.SportId
                                          FROM Stadium s
                                     LEFT JOIN Team ht ON ht.Id = s.TeamId
                                     LEFT JOIN League l on l.Id = ht.LeagueId
                                         WHERE ht.LeagueId = @leagueId
                                         ORDER BY s.Name";
                    cmd.Parameters.AddWithValue("@leagueId", leagueId);
                    var reader = cmd.ExecuteReader();

                    var stadiums = new List<Stadium>();

                    while (reader.Read())
                    {
                        stadiums.Add(ReadStadium(reader));
                    }

                    reader.Close();

                    return stadiums;
                }
            }
        }

        public Stadium ReadStadium(SqlDataReader reader)
        {
            return new Stadium()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                Location = reader.GetString(reader.GetOrdinal("Location")),
                TeamId = reader.GetInt32(reader.GetOrdinal("TeamId")),
                Team = new Team()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("TeamId")),
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
                FirstGameDate = reader.GetDateTime(reader.GetOrdinal("StadiumFirstGameDate")),
                LastGameDate = reader.IsDBNull(reader.GetOrdinal("StadiumLastGameDate"))
                                   ? null : reader.GetDateTime(reader.GetOrdinal("StadiumLastGameDate"))
            };
        }
    }
}

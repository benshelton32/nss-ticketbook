using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using TicketBook.Models;
using TicketBook.Repositories.Interfaces;

namespace TicketBook.Repositories
{
    public class TeamRepository : BaseRepository, ITeamRepository
    {
        public TeamRepository(IConfiguration config) : base(config) { }

        public List<Team> GetAllTeams()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, Abbreviation, Location, Logo, LeagueId 
                                          FROM Team
                                      ORDER BY name";
                    var reader = cmd.ExecuteReader();

                    var teams = new List<Team>();

                    while (reader.Read())
                    {
                        teams.Add(ReadTeam(reader));
                    }

                    reader.Close();

                    return teams;
                }
            }
        }

        public Team GetTeamById(int teamId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, Abbreviation, Location, Logo, LeagueId 
                                          FROM Team
                                         WHERE Id = @teamId";
                    cmd.Parameters.AddWithValue("@teamId", teamId);
                    var reader = cmd.ExecuteReader();

                    Team team = null;

                    if (reader.Read())
                    {
                        team = ReadTeam(reader);
                    }

                    reader.Close();

                    return team;
                }
            }
        }

        public List<Team> GetTeamsByLeagueId(int leagueId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, Abbreviation, Location, Logo, LeagueId 
                                          FROM Team
                                         WHERE LeagueId = @leagueId";
                    cmd.Parameters.AddWithValue("@leagueId", leagueId);
                    var reader = cmd.ExecuteReader();

                    var teams = new List<Team>();

                    while (reader.Read())
                    {
                        teams.Add(ReadTeam(reader));
                    }

                    reader.Close();

                    return teams;
                }
            }
        }

        public Team ReadTeam(SqlDataReader reader)
        {
            return new Team()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                Abbreviation = reader.GetString(reader.GetOrdinal("Abbreviation")),
                Location = reader.GetString(reader.GetOrdinal("Location")),
                Logo = reader.GetString(reader.GetOrdinal("Logo")),
                LeagueId = reader.GetInt32(reader.GetOrdinal("LeagueId"))
            };
        }
    }
}

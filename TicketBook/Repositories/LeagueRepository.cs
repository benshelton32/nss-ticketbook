using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using TicketBook.Models;
using TicketBook.Repositories.Interfaces;

namespace TicketBook.Repositories
{
    public class LeagueRepository : BaseRepository, ILeagueRepository
    {
        public LeagueRepository(IConfiguration config) : base(config) { }

        public List<League> GetAllLeagues()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, Abbreviation, Logo, SportId 
                                          FROM League
                                      ORDER BY name";
                    var reader = cmd.ExecuteReader();

                    var leagues = new List<League>();

                    while (reader.Read())
                    {
                        leagues.Add(ReadLeague(reader));
                    }

                    reader.Close();

                    return leagues;
                }
            }
        }

        public League GetLeagueById(int leagueId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, Abbreviation, Logo, SportId 
                                          FROM League
                                         WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", leagueId);
                    var reader = cmd.ExecuteReader();

                    League league = null;

                    if (reader.Read())
                    {
                        league = ReadLeague(reader);
                    }

                    reader.Close();

                    return league;
                }
            }
        }

        public League ReadLeague(SqlDataReader reader)
        {
            return new League()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                Abbreviation = reader.GetString(reader.GetOrdinal("Abbreviation")),
                Logo = reader.GetString(reader.GetOrdinal("Logo")),
                SportId = reader.GetInt32(reader.GetOrdinal("SportId"))
            };
        }
    }
}

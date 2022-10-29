using System.Collections.Generic;
using System.Data.SqlClient;
using TicketBook.Models;

namespace TicketBook.Repositories.Interfaces
{
    public interface ITeamRepository
    {
        List<Team> GetAllTeams();
        Team GetTeamById(int teamId);
        List<Team> GetTeamsByLeagueId(int leagueId);
        Team ReadTeam(SqlDataReader reader);
    }
}
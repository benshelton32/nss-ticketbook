using System.Collections.Generic;
using System.Data.SqlClient;
using TicketBook.Models;

namespace TicketBook.Repositories.Interfaces
{
    public interface ILeagueRepository
    {
        List<League> GetAllLeagues();
        League GetLeagueById(int leagueId);
        League ReadLeague(SqlDataReader reader);
    }
}
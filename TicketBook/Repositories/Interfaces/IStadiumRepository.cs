using System.Collections.Generic;
using System.Data.SqlClient;
using TicketBook.Models;

namespace TicketBook.Repositories.Interfaces
{
    public interface IStadiumRepository
    {
        List<Stadium> GetAllStadiums();
        Stadium GetStadiumByHomeTeamId(int homeTeamId);
        Stadium GetStadiumById(int stadiumId);
        List<Stadium> GetStadiumsByLeagueId(int leagueId);
        Stadium ReadStadium(SqlDataReader reader);
    }
}
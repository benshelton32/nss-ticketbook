using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TicketBook.Models;
using TicketBook.Repositories;
using TicketBook.Repositories.Interfaces;

namespace TicketBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StadiumController : ControllerBase
    {
        private readonly IStadiumRepository _stadiumRepository;
        public StadiumController(IStadiumRepository stadiumRepository)
        {
            _stadiumRepository = stadiumRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_stadiumRepository.GetAllStadiums());
        }

        [HttpGet("{stadiumId}")]
        public IActionResult Get(int stadiumId)
        {
            var stadium = _stadiumRepository.GetStadiumById(stadiumId);
            if (stadium == null)
            {
                return NotFound();
            }
            return Ok(stadium);
        }

        [HttpGet("ByLeague/{leagueId}")]
        public IActionResult GetStadiumsByLeague(int leagueId)
        {
            return Ok(_stadiumRepository.GetStadiumsByLeagueId(leagueId));
        }

        [HttpGet("ByHomeTeam/{teamId}")]
        public IActionResult GetStadiumByHomeTeam(int teamId)
        {
            return Ok(_stadiumRepository.GetStadiumByHomeTeamId(teamId));
        }
    }
}

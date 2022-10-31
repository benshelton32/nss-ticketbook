using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TicketBook.Models;
using TicketBook.Repositories;
using TicketBook.Repositories.Interfaces;

namespace TicketBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamRepository _teamRepository;
        public TeamController(ITeamRepository teamRepository)
        {
            _teamRepository = teamRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_teamRepository.GetAllTeams());
        }

        [HttpGet("{teamId}")]
        public IActionResult Get(int teamId)
        {
            var league = _teamRepository.GetTeamById(teamId);
            if (league == null)
            {
                return NotFound();
            }
            return Ok(league);
        }

        [HttpGet("ByLeague/{leagueId}")]
        public IActionResult GetTeamsByLeague(int leagueId)
        {
            return Ok(_teamRepository.GetTeamsByLeagueId(leagueId));
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TicketBook.Models;
using TicketBook.Repositories;
using TicketBook.Repositories.Interfaces;

namespace TicketBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeagueController : ControllerBase
    {
        private readonly ILeagueRepository _leagueRepository;
        public LeagueController(ILeagueRepository leagueRepository)
        {
            _leagueRepository = leagueRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_leagueRepository.GetAllLeagues());
        }

        [HttpGet("{leagueId}")]
        public IActionResult Get(int leagueId)
        {
            var league = _leagueRepository.GetLeagueById(leagueId);
            if (league == null)
            {
                return NotFound();
            }
            return Ok(league);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TicketBook.Models;
using TicketBook.Repositories;

namespace TicketBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendedEventController : ControllerBase
    {
        private readonly IAttendedEventRepository _attendedEventRepository;
        public AttendedEventController(IAttendedEventRepository attendedEventRepository)
        {
            _attendedEventRepository = attendedEventRepository;
        }

        private int GetCurrentUserProfileId()
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return int.Parse(id);
        }

        [HttpGet]
        public IActionResult Get()
        {
            var userId = GetCurrentUserProfileId();
            var currentUsersAttendedEvents = _attendedEventRepository.GetCurrentUsersEvents(userId);
            return Ok(currentUsersAttendedEvents);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int eventId)
        {
            var attendedEvent = _attendedEventRepository.GetAttendedEventById(eventId);
            if (attendedEvent == null)
            {
                return NotFound();
            }
            return Ok(attendedEvent);
        }

        [HttpPost]
        public IActionResult Post(AttendedEvent attendedEvent)
        {
            _attendedEventRepository.AddAttendedEvent(attendedEvent);

            return CreatedAtAction("Get", new { id = attendedEvent.Id }, attendedEvent);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int eventId, AttendedEvent attendedEvent)
        {
            attendedEvent.Id = eventId;
            _attendedEventRepository.UpdateAttendedEvent(attendedEvent);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int eventId)
        {
            _attendedEventRepository.DeleteAttendedEvent(eventId);
            return NoContent();
        }

    }
}

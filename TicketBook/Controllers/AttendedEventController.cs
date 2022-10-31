using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TicketBook.Models;
using TicketBook.Repositories.Interfaces;

namespace TicketBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendedEventController : ControllerBase
    {
        private readonly IAttendedEventRepository _attendedEventRepository;
        private readonly IUserRepository _userRepository;
        public AttendedEventController(IAttendedEventRepository attendedEventRepository, IUserRepository userRepository)
        {
            _attendedEventRepository = attendedEventRepository;
            _userRepository = userRepository;
        }

        //private int GetCurrentUserProfileId()
        //{
        //    string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //    return int.Parse(id);
        //}

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_attendedEventRepository.GetAllAttendedEvents());
        }

        [HttpGet("CurrentUsersEvents")]
        public IActionResult GetUsersEvents()
        {
            var currentUser = GetCurrentUser();
            //var currentUsersAttendedEvents = _attendedEventRepository.GetCurrentUsersEvents(currentUser.Id);
            return Ok(_attendedEventRepository.GetCurrentUsersEvents(currentUser.Id));
        }

        [HttpGet("{eventId}")]
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

            var currentUser = GetCurrentUser();
            attendedEvent.UserId = currentUser.Id;

            return CreatedAtAction("Get", new { id = attendedEvent.Id }, attendedEvent);
        }

        [HttpPut("{eventId}")]
        public IActionResult Put(int eventId, AttendedEvent attendedEvent)
        {
            attendedEvent.Id = eventId;
            _attendedEventRepository.UpdateAttendedEvent(attendedEvent);
            return NoContent();
        }

        [HttpDelete("{eventId}")]
        public IActionResult Delete(int eventId)
        {
            _attendedEventRepository.DeleteAttendedEvent(eventId);
            return NoContent();
        }

    }
}

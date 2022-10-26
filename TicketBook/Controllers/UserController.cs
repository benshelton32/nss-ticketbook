using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using TicketBook.Models;
using TicketBook.Repositories;

namespace TicketBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUser(string firebaseUserId)
        {
            var user = _userRepository.GetByFirebaseUserId(firebaseUserId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var user = _userRepository.GetByFirebaseUserId(firebaseUserId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok();
        }

        //[HttpGet]
        //public IActionResult Get()
        //{
        //    var user = _userRepository.GetAll();
        //    return Ok(user);
        //}

        //[HttpPost]
        //public IActionResult Post(User user)
        //{
        //    _userRepository.Add(user);
        //    return CreatedAtAction(
        //        nameof(GetUser),
        //        new { firebaseUserId = user.FirebaseUserId },
        //        user);
        //}

        [HttpPost]
        public IActionResult Register(User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction(
                nameof(GetUser), new { firebaseUserId = user.FirebaseUserId }, user);
        }
    }
}

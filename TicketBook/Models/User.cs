﻿using System.ComponentModel.DataAnnotations;
using System;

namespace TicketBook.Models
{
    public class User
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }


        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}

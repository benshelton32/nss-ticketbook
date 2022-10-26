using System;
using System.ComponentModel.DataAnnotations;

namespace TicketBook.Models
{
    public class Stadium
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required]
        [MaxLength(255)]
        public string Location { get; set; }

        [Required]
        public int TeamId { get; set; }
        public Team Team { get; set; }

        [Required]
        public DateTime FirstGameDate { get; set; }
        public DateTime LastGameDate { get; set; }
    }
}

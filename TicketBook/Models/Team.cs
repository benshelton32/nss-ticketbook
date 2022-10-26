using System;
using System.ComponentModel.DataAnnotations;

namespace TicketBook.Models
{
    public class Team
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required]
        [MaxLength(10)]
        public string Abbreviation { get; set; }

        [Required]
        [MaxLength(255)]
        public string Location { get; set; }

        [Required]
        public string Logo { get; set; }

        [Required]
        public int LeagueId { get; set; }
        public League League { get; set; }

        [Required]
        public DateTime FirstGameDate { get; set; }
        public DateTime LastGameDate { get; set; }
    }
}

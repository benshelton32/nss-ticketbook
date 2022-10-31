using System;
using System.ComponentModel.DataAnnotations;
using System.Data.Common;

namespace TicketBook.Models
{
    public class AttendedEvent
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        public int HomeTeamId { get; set; }
        public Team HomeTeam { get; set; }

        [Required]
        public int AwayTeamId { get; set; }
        public Team AwayTeam { get; set; }
        public int HomeTeamScore { get; set; }
        public int AwayTeamScore { get; set; }

        [Required]
        public int StadiumId { get; set; }
        public Stadium Stadium { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [MaxLength(5)]
        public string Section { get; set; }

        [MaxLength(5)]
        public string Row { get; set; }

        [MaxLength(5)]
        public string Seat { get; set; }
        public bool Overtime { get; set; }

        [MaxLength(10)]
        public string LengthOfOvertime { get; set; }
        public string Notes { get; set; }
    }
}

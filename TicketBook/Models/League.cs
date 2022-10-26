using System.ComponentModel.DataAnnotations;
using System.Web;

namespace TicketBook.Models
{
    public class League
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required]
        [MaxLength(10)]
        public string Abbreviation { get; set; }

        [Required]
        public string Logo { get; set; }

        [Required]
        public int SportId { get; set; }
        public Sport Sport { get; set; }
    }
}

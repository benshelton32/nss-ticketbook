using System.ComponentModel.DataAnnotations;

namespace TicketBook.Models
{
    public class Sport
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(255)]
        public string ImageLocation { get; set; }
    }
}

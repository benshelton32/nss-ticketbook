using System.Collections.Generic;
using System.Data.SqlClient;
using TicketBook.Models;

namespace TicketBook.Repositories
{
    public interface IAttendedEventRepository
    {
        void AddAttendedEvent(AttendedEvent attendedEvent);
        void DeleteAttendedEvent(int eventId);
        List<AttendedEvent> GetAllAttendedEvents();
        List<AttendedEvent> GetCurrentUsersEvents(int userId);
        AttendedEvent GetAttendedEventById(int eventId);
        AttendedEvent ReadAttendedEvent(SqlDataReader reader);
        void UpdateAttendedEvent(AttendedEvent attendedEvent);
    }
}
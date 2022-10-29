using TicketBook.Models;

namespace TicketBook.Repositories.Interfaces
{
    public interface IUserRepository
    {
        void Add(User user);
        User GetByFirebaseUserId(string firebaseUserId);
    }
}
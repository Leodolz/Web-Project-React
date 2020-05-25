using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebExamPlatformBackend.DAL;

namespace WebExamPlatformBackend.Repository
{
    public class UserRepository : Generic.GenericRepository<User>
    {
        public UserRepository(DbContext context) : base(context)
        {

        }
        public User GetByUsername(object username)
        {
            return table.SingleOrDefault(userInTable => userInTable.username == (string)username);
        }
        public List<User> GetGroupByRole(object role)
        {
            return table.Where(user => user.role.Trim() == (string)role)
               .Select(user => user).ToList();
        }
        public List<string> GetAllUserNames()
        {
            return table.Select(user => user.username).ToList();
        }
    }
}

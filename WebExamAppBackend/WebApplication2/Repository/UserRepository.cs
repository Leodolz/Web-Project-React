using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication2.DAL;

namespace WebApplication2.Repository
{
    public class UserRepository: GenericRepository<User>
    {
        public UserRepository(DbContext context):base(context)
        {
            
        }
        public User GetByUsername(object username)
        {
            return table.SingleOrDefault(userInTable => userInTable.username == (string)username);
        }
        public User GetAllWithSameName(object username)
        {
            return table.Where(user => user.username == (string)username)
                .Select(user => user).ToList()[0];
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
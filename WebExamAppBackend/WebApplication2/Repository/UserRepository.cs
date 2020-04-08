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
    }
}
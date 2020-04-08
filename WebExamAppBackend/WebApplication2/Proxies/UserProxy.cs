using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.DBControllers;
using WebApplication2.Utils;

namespace WebApplication2.Proxies
{
    public class UserProxy : IUserProxy
    {
        private List<User> usersCache;
        private UserController userController;
        public UserProxy(UserController userController)
        {
            usersCache = new List<User>();
            this.userController = userController;
        }
        public User GetUser(string username)
        {
            User cachedUser = usersCache.Find(user => user.username.Trim() == username.Trim());
            if(cachedUser==null)
            {
                User newUser = userController.GetByUsername(username);
                usersCache.Add(newUser);
                System.Diagnostics.Debug.WriteLine("User fetched is:"+newUser.username);
                System.Diagnostics.Debug.WriteLine("With password: " + newUser.password.Trim());
                return newUser;
            }

            System.Diagnostics.Debug.WriteLine("User cached is:" + cachedUser);
            return cachedUser;
        }
    }
}
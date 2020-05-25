using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebExamPlatformBackend.DBControllers;
using WebExamPlatformBackend.Models;
using WebExamPlatformBackend.DAL;

namespace WebExamPlatformBackend.Proxies
{
    public class UserProxy
    {
        private static List<User> usersCache;
        private UserController userController;
        public UserProxy(UserController userController)
        {
            usersCache = new List<User>();
            this.userController = userController;
        }
        public User GetUser(string username)
        {
            User cachedUser = usersCache.Find(user => user.username.Trim() == username.Trim());
            if (cachedUser == null)
            {
                User newUser = userController.GetByUsername(username);
                if (newUser == null)
                    return null;
                usersCache.Add(newUser);
                System.Diagnostics.Debug.WriteLine("User fetched is:" + newUser.username);
                System.Diagnostics.Debug.WriteLine("With password: " + newUser.password.Trim());
                return newUser;
            }

            System.Diagnostics.Debug.WriteLine("User cached is:" + cachedUser);
            return cachedUser;
        }
        public static void UpdateUser(int userId)
        {
            usersCache.RemoveAll(user => user.Id == userId);
        }
    }
}

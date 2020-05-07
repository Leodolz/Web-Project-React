using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.Repository;
using WebApplication2.DAL;

namespace WebApplication2.DBControllers
{
    public class UserController 
    {
        private UserRepository userRepository = null;

        public UserController()
        {
            userRepository = new UserRepository(new Exam_DBPlatform4());
        }
        public List<User> GetAllUsers()
        {
            return userRepository.GetAll().ToList();
        }
        public List<string> GetAllUsernames()
        {
            return userRepository.GetAllUserNames();
        }
        public int AddUser(User model)
        {
            var allUsers = userRepository.GetAll();
            int lastId = 0;
            if (allUsers.Count() > 0)
                 lastId = allUsers[allUsers.Count() - 1].Id;
            model.Id = lastId + 1;
            userRepository.Insert(model);
            userRepository.Save();
            return model.Id;
        }
        public void EditUser(int userId, User newUser)
        {
            User model = userRepository.GetById(userId);
            model = newUser;
            EditUser(model);
        }
        private void EditUser(User model)
        {
            userRepository.Update(model);
            userRepository.Save();
        }
        public void DeleteStudent(int userId)
        {
            User model = userRepository.GetById(userId);
            if (model == null)
                return;
            Delete(userId);
        }
      
        private void Delete(int studentID)
        {
            userRepository.Delete(studentID);
            userRepository.Save();
        }
        public User GetByUsername(string username)
        {
            return userRepository.GetByUsername(username);
        }
        public List<User> GetGroupByRole(string role)
        {
            return userRepository.GetGroupByRole(role);
        }
        public User GetById(int id)
        {
            return userRepository.GetById(id);
        }
    }
}

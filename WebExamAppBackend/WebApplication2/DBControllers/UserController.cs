﻿using System;
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
            userRepository = new UserRepository(new Exam_DBContext());
        }
        public List<User> GetAllUsers()
        {
            return userRepository.GetAll().ToList();
        }
        /*
        public UserController(IGenericRepository<User> userRepository)
        {
            this.userRepository = userRepository;
        }*/
        public void AddUser(User model)
        {
            var allUsers = userRepository.GetAll();
            int lastId = allUsers[allUsers.Count() - 1].Id;
            model.Id = lastId + 1;
            userRepository.Insert(model);
            userRepository.Save();
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
            return userRepository.GetAllWithSameName(username);
        }
        public List<User> GetGroupByRole(string role)
        {
            return userRepository.GetGroupByRole(role);
        }
        
    }
}

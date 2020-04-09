using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.Repository;
using WebApplication2.DAL;
using WebApplication2.Utils;
using WebApplication2.Models;

namespace WebApplication2.DBControllers
{
    public class RealStudentController
    {
        private UserController userController = new UserController();
        private AreaController areaController = new AreaController();
        private SubAreaController subAreaController = new SubAreaController();
        public List<RealStudent> GetAllStudents()
        {
            List<User> allStudents = userController.GetGroupByRole("Student");
            List<RealStudent> allRealStudents = new List<RealStudent>();
            foreach(User user in allStudents)
            {
                System.Diagnostics.Debug.WriteLine("User is: " + user.full_name);
            }
            foreach(User student in allStudents)
            {
                allRealStudents.Add(StudentUtils.UserToStudent(student,subAreaController, areaController));
            }
            return allRealStudents;
        }

        public void AddStudent(User model) //subareas assigned?
        {
            userController.AddUser(model);
            //Add assignations for subareas
        }
        public void EditUser(int userId, User newUser) //change subarea assignations?
        {
            userController.EditUser(userId, newUser);
            //Edit assignations for subareas
        }

        public void DeleteStudent(int userId)
        {
            userController.DeleteStudent(userId);
            //Delete assignations for subareas
        }

    }
}
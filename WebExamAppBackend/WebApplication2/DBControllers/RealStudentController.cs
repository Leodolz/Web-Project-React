using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.Repository;
using WebApplication2.DAL;
using WebApplication2.Utils;
using WebApplication2.Models;
using WebApplication2.Proxies;

namespace WebApplication2.DBControllers
{
    public class RealStudentController
    {
        private UserController userController = new UserController();
        private AreaController areaController = new AreaController();
        private SubAreaController subAreaController = new SubAreaController();
        public List<RealStudent> GetAllStudents(StudentTeacherProxy studentTeacherProxy)
        {
            List<User> allStudents = userController.GetGroupByRole("Student");
            List<RealStudent> allRealStudents = new List<RealStudent>();
            foreach(User student in allStudents)
            {
                allRealStudents.Add(studentTeacherProxy.GetStudent(student.Id));
            }
            return allRealStudents;
        }

        public void AddStudent(User model, string[] subareas) 
        {
            int userId = userController.AddUser(model);
            SubAreaAssignUtils.AssignSubAreasToUser(userId, subAreaController, subareas);
        }
        public void EditStudent(User newUser, string[] subareas, bool changedName) 
        {
            newUser.password = userController.GetById(newUser.Id).password;
            userController.EditUser(newUser.Id, newUser);
            ChangeUserSubAreas(newUser.Id, subareas.ToList(),changedName);
        }

        public void DeleteStudent(int userId)
        {
            userController.DeleteStudent(userId);
            //Delete assignations for subareas
        }
        private void ChangeUserSubAreas(int userId, List<string> newSubAreas, bool changedName)
        {
            List<SubArea> UserSubAreas = subAreaController.GetUserSubAreas(userId);
            if(changedName)
                ResetSubAreasProxy(UserSubAreas);
            List<string> oldSubAreas = SubAreaUtils.GetSubAreasStrings(UserSubAreas).ToList();
            List<string> subAreasToAssign = SubAreaUtils.OneWayCompareSubAreas(newSubAreas, oldSubAreas);
            List<string> subAreasToDelete = SubAreaUtils.OneWayCompareSubAreas(oldSubAreas, newSubAreas);
            SubAreaAssignUtils.AssignSubAreasToUser(userId, subAreaController, subAreasToAssign.ToArray());
            SubAreaAssignUtils.UnAssignSubAreasToUser(userId, subAreaController, subAreasToDelete.ToArray());
        }
        public UserController GetUserController()
        {
            return userController;
        }
        private void ResetSubAreasProxy(List<SubArea> subareas)
        {
            System.Diagnostics.Debug.WriteLine("Student changed name!");
            foreach (SubArea subArea in subareas)
            {
                RealAreaProxy.UpdateArea(subArea.parentAreaId);
            }
        }

    }
}
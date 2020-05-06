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
        public List<RealStudent> GetAllUsersByRole(StudentTeacherProxy studentTeacherProxy, string role)
        {
            List<User> allUsers = userController.GetGroupByRole(role);
            return UsersToRealUsers(allUsers,studentTeacherProxy);
        }
        private List<RealStudent> UsersToRealUsers(List<User> allUsers, StudentTeacherProxy studentTeacherProxy)
        {
            List<RealStudent> allRealStudents = new List<RealStudent>();
            foreach (User student in allUsers)
            {
                allRealStudents.Add(studentTeacherProxy.GetStudent(student.Id));
            }
            return allRealStudents;
        }
        
        public List<RealStudent> GetStudentsInSubAreas(StudentTeacherProxy studentTeacherProxy, int userId)
        {
            List<SubArea> allSubAreas = subAreaController.GetUserSubAreas(userId);
            List<int> allStudentIds = new List<int>();
            foreach(SubArea subarea in allSubAreas)
            {
                allStudentIds.AddRange(subAreaController.GetAllStudentsIds(subarea.Id));
            }
            List<User> allUsers = new List<User>();
            foreach(int studentId in allStudentIds)
            {
                if (allUsers.Find(user => user.Id == studentId) == null)
                    allUsers.Add(userController.GetById(studentId));
            }
            allUsers.RemoveAll(user => user.role != "Student");
            return UsersToRealUsers(allUsers,studentTeacherProxy);
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
            List<SubArea> userSubAreas = subAreaController.GetUserSubAreas(userId);
            ResetSubAreasProxy(userSubAreas);
            List<string> assignmentsToDelete =  SubAreaUtils.GetSubAreasStrings(userSubAreas).ToList();
            SubAreaAssignUtils.UnAssignSubAreasToUser(userId, subAreaController, assignmentsToDelete.ToArray());
            StudentExamController studentExamController = new StudentExamController();
            StudentExamQuestionController studentExamQuestionController = new StudentExamQuestionController();
            List<StudentExam> allStudentExamIds = studentExamController.GetAllStudentExams(userId);
            foreach(StudentExam studentExam in allStudentExamIds)
            {
                studentExamQuestionController.DeleteAllStudentExamQuestions(studentExam.Id);
                studentExamController.DeleteStudentExam(studentExam.Id);
            }
            userController.DeleteStudent(userId);
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
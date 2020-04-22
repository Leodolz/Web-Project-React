using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.Models;
using WebApplication2.DBControllers;

namespace WebApplication2.Utils
{
    public static class StudentUtils
    {
        public static RealStudent UserToStudent(User user, SubAreaController subAreaController, AreaController areaController)
        {
            List<SubArea> userSubAreas = subAreaController.GetUserSubAreas(user.Id);
            return new RealStudent
            {
                Id=user.Id,
                email= user.email,
                username= user.username,
                active= user.active,
                birth = user.birth.ToShortDateString(),
                name = user.full_name,
                contact = user.contact,
                subareas = SubAreaUtils.GetSubAreasStrings(userSubAreas),
                areas = getAreas(userSubAreas, areaController),
                full_name = user.full_name,
                role = user.role
            };
        }
        private static string[] getAreas(List<SubArea> subAreas, AreaController areaController)
        {
           
            List<string> areas = new List<string>();
            foreach (SubArea subarea in subAreas)
            {
                string areaName = areaController.getById(subarea.parentAreaId).name;
                if(areas.Find(name=>name==areaName)==null)
                    areas.Add(areaName);
            }
            return areas.ToArray();
        }
        public static User NewStudentToUser(RealStudent student)
        {
            
            return new User
            {
                Id = student.Id,
                email = student.email,
                username = student.username,
                role= student.role,
                password = StringUtils.StringToSha("User_123"),
                created = DateTime.Today,
                until = DateTime.Today.AddYears(4), //TODO: OBSERVATION CHANGE FOR REAL FORM
                active = new byte[] {1},
                full_name = student.name,
                birth = DateTime.Parse(student.birth), 
                contact = student.contact
            };
        }
        public static User EditedStudentToUser(RealStudent student, UserController userController)
        {
            User editedUser = userController.GetById(student.Id);
            editedUser.email = student.email;
            editedUser.username = student.username;
            editedUser.full_name = student.name;
            editedUser.birth = DateTime.Parse(student.birth);
            editedUser.contact = student.contact;
            return editedUser;
        }
        
    }
}
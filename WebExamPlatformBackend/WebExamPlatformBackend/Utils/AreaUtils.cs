using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.Models;
using WebExamPlatformBackend.DBControllers;

namespace WebExamPlatformBackend.Utils
{
    public static class AreaUtils
    {
        public static RealArea AreaToRealArea(Area area, SubAreaController subAreaController, UserController userController)
        {
            List<SubArea> availableSubAreas = SubAreaUtils.GetAvailableSubAreasInAreas(new List<Area> { area }, subAreaController);
            List<RealSubArea> realAvailableSubAreas = new List<RealSubArea>();
            foreach (SubArea subarea in availableSubAreas)
            {
                realAvailableSubAreas.Add(SubAreaToRealSubArea(subarea, subAreaController, userController));
            }
            return new RealArea
            {
                Id = area.Id,
                created = area.created.ToShortDateString(),
                name = area.name,
                subareas = realAvailableSubAreas.ToArray(),
                students = allNonRepeatedStudents(realAvailableSubAreas)
            };
        }
        public static RealSubArea SubAreaToRealSubArea(SubArea subArea, SubAreaController subAreaController, UserController userController)
        {
            List<int> allStudentIds = subAreaController.GetAllStudentsIds(subArea.Id);
            List<string> allStudentNames = new List<string>();
            List<User> allStudents = new List<User>();
            foreach (int studentId in allStudentIds)
            {
                User user = userController.GetById(studentId);
                if (user.role == "Student")
                {
                    allStudentNames.Add(user.username);
                    allStudents.Add(user);
                }
            }
            RealSubArea realSubArea = new RealSubArea
            {
                parentAreaId = subArea.parentAreaId,
                name = subArea.name,
                Id = subArea.Id,
                created = subArea.created.ToShortDateString(),
                students = allStudentNames.ToArray(),
                studentsObj = allStudents.ToArray(),
            };
            return realSubArea;
        }

        private static string[] allNonRepeatedStudents(List<RealSubArea> allrealSubAreas)
        {
            List<string> allStudents = new List<string>();
            foreach (RealSubArea realSubArea in allrealSubAreas)
            {
                foreach (string student in realSubArea.students)
                {
                    if (!allStudents.Contains(student))
                        allStudents.Add(student);
                }
            }
            return allStudents.ToArray();
        }

    }
}

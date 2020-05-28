using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebExamPlatformBackend.DBControllers;
using WebExamPlatformBackend.Models;
using WebExamPlatformBackend.Utils;

namespace WebExamPlatformBackend.Proxies
{
    public class StudentTeacherProxy
    {
        private static List<RealStudent> teacherStudentsCache = new List<RealStudent>();
        private UserController userController = new UserController();
        private SubAreaController subAreaController = new SubAreaController();
        private AreaController areaController = new AreaController();
        public RealStudent GetStudent(int id)
        {
            RealStudent cachedStudent = teacherStudentsCache.Find(student => student.Id == id);
            if (cachedStudent == null)
            {
                RealStudent newStudent = StudentUtils.UserToStudent(userController.GetById(id), subAreaController, areaController);
                teacherStudentsCache.Add(newStudent);
                System.Diagnostics.Debug.WriteLine("Student fetched is:" + newStudent.name);
                return newStudent;
            }
            System.Diagnostics.Debug.WriteLine("Student cached is:" + cachedStudent.name);
            return cachedStudent;
        }
        public static void UpdateStudent(RealStudent student)
        {
            teacherStudentsCache.Remove(student);
        }
        public static void UpdateStudent(int studentId)
        {
            teacherStudentsCache.RemoveAll(student => student.Id == studentId);
        }
        
    }
}

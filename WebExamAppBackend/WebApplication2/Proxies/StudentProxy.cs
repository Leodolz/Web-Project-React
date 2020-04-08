using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.DBControllers;

namespace WebApplication2.Proxies
{
    public class StudentProxy
    {
        private List<Student> studentsCache;
        private StudentController studentController;
        public StudentProxy(StudentController studentController)
        {
            studentsCache = new List<Student>();
            this.studentController = studentController;
        }
        public Student GetUser(int id)
        {
            Student cachedUser = studentsCache.Find(student => student.Id == id);
            if (cachedUser == null)
            {
                Student newUser = studentController.GetById(id);
                studentsCache.Add(newUser);
                System.Diagnostics.Debug.WriteLine("User fetched is:" + newUser.username);
                return newUser;
            }

            System.Diagnostics.Debug.WriteLine("User cached is:" + cachedUser);
            return cachedUser;
        }
    }
}
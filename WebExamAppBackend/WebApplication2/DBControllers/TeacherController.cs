using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.Repository;


namespace WebApplication2.DBControllers
{
    public class TeacherController
    {
        private GenericRepository<Teacher> genericRepository;
        public TeacherController()
        {
            genericRepository = new GenericRepository<Teacher>(new Exam_DatabaseContext());
        }
        public List<Teacher> GetAllUsers()
        {
            return genericRepository.GetAll().ToList();
        }
        public void AddElement(Teacher model)
        {
            var allPersons = genericRepository.GetAll();
            int lastId = allPersons.Count;
            model.Id = lastId;
            genericRepository.Insert(model);
            genericRepository.Save();
        }
        public void EditUser(int userId, Teacher newUser)
        {
            Teacher model = genericRepository.GetById(userId);
            model = newUser;
            EditUser(model);
        }
        private void EditUser(Teacher model)
        {
            genericRepository.Update(model);
            genericRepository.Save();
        }
        public void DeleteTeacher(int userId)
        {
            Teacher model = genericRepository.GetById(userId);
            if (model == null)
                return;
            Delete(userId);
        }

        private void Delete(int teacherID)
        {
            genericRepository.Delete(teacherID);
            genericRepository.Save();
        }
    }
}
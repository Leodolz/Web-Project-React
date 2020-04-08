using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.Repository;

namespace WebApplication2.DBControllers
{
    public class StudentController
    {
        private GenericRepository<Student> genericRepository;
        public StudentController()
        {
            genericRepository = new GenericRepository<Student>(new Exam_DatabaseContext());
        }
        public List<Student> GetAllUsers()
        {
            return genericRepository.GetAll().ToList();
        }
        public void AddElement(Student model)
        {
            var allPersons = genericRepository.GetAll();
            int lastId = allPersons.Count;
            model.Id = lastId;
            genericRepository.Insert(model);
            genericRepository.Save();
        }
        public void EditStudent(int userId, Student newUser)
        {
            Student model = genericRepository.GetById(userId);
            model = newUser;
            EditStudent(model);
        }
        private void EditStudent(Student model)
        {
            genericRepository.Update(model);
            genericRepository.Save();
        }
        public void DeleteStudent(int userId)
        {
            Student model = genericRepository.GetById(userId);
            if (model == null)
                return;
            Delete(userId);
        }

        private void Delete(int studentID)
        {
            genericRepository.Delete(studentID);
            genericRepository.Save();
        }
        public Student GetById(int id)
        {
            return genericRepository.GetById(id);
        }

    }
}
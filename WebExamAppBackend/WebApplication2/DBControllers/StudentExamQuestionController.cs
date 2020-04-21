using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.Repository;
using WebApplication2.DAL;
using WebApplication2.Models;

namespace WebApplication2.DBControllers
{
    public class StudentExamQuestionController
    {
        private StudentExamQuestionRepository studentExamRepository = new StudentExamQuestionRepository(new Exam_DBPlatform());

        public StudentQuestionTable GetById(int id)
        {
            return studentExamRepository.GetById(id);
        }
        public StudentQuestionTable GetByModelQuestionId(int id)
        {
            return studentExamRepository.GetByModelQuestionId(id);
        }

        public List<StudentQuestionTable> GetAllExamQuestions()
        {
            return studentExamRepository.GetAll().ToList();
        }

        public int AddStudentExamQuestion(StudentQuestionTable model)
        {
            var allExamQuestions = studentExamRepository.GetAll();
            int lastId = 0;
            if(allExamQuestions.Count()>0)
                lastId = allExamQuestions[allExamQuestions.Count() - 1].Id;
            model.Id = lastId + 1;
            studentExamRepository.Insert(model);
            studentExamRepository.Save();
            return model.Id;
        }
        public void EditStudentExamQuestion(int examQuestionId, StudentQuestionTable newExamQuestion)
        {
            StudentQuestionTable model = studentExamRepository.GetById(examQuestionId);
            model = newExamQuestion;
            EditStudentExamQuestion(model);
        }
        private void EditStudentExamQuestion(StudentQuestionTable model)
        {
            studentExamRepository.Update(model);
            studentExamRepository.Save();

        }
        public void DeleteStudentExamQuestion(int examQuestionId)
        {
            StudentQuestionTable model = studentExamRepository.GetById(examQuestionId);
            if (model == null)
                return;
            Delete(examQuestionId);
        }
        private void Delete(int examId)
        {
            studentExamRepository.Delete(examId);
            studentExamRepository.Save();
        }
    }
}
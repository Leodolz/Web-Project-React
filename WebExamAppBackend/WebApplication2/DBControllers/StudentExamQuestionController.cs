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
        private StudentExamQuestionRepository studentExamQuestionRepository = new StudentExamQuestionRepository(new Exam_DBPlatform4());

        public StudentQuestionTable GetById(int id)
        {
            return studentExamQuestionRepository.GetById(id);
        }
        public StudentQuestionTable GetByModelQuestionId(int questionId, int studentExamId)
        {
            return studentExamQuestionRepository.GetByModelQuestionIdAndStudentId(questionId, studentExamId);
        }

        public List<int> GetAllExamQuestions(int studentExamId)
        {
            return studentExamQuestionRepository.GetAllQuestionsInExam(studentExamId);
        }

        public int AddStudentExamQuestion(StudentQuestionTable model)
        {
            var allExamQuestions = studentExamQuestionRepository.GetAll();
            int lastId = 0;
            if(allExamQuestions.Count()>0)
                lastId = allExamQuestions[allExamQuestions.Count() - 1].Id;
            model.Id = lastId + 1;
            studentExamQuestionRepository.Insert(model);
            studentExamQuestionRepository.Save();
            return model.Id;
        }
        public void EditStudentExamQuestion(int examQuestionId, StudentQuestionTable newExamQuestion)
        {
            StudentQuestionTable model = studentExamQuestionRepository.GetById(examQuestionId);
            model = newExamQuestion;
            EditStudentExamQuestion(model);
        }
        private void EditStudentExamQuestion(StudentQuestionTable model)
        {
            studentExamQuestionRepository.Update(model);
            studentExamQuestionRepository.Save();

        }
        public void DeleteAllStudentExamQuestions(int studentExamId)
        {
            List<int> allstudentQuestionIds = studentExamQuestionRepository.GetAllStudentQuestionIdsInExam(studentExamId);
            foreach(int stQuestionId in allstudentQuestionIds)
            {
                DeleteStudentExamQuestion(stQuestionId);
            }
        }

        private void DeleteStudentExamQuestion(int examQuestionId)
        {
            StudentQuestionTable model = studentExamQuestionRepository.GetById(examQuestionId);
            if (model == null)
                return;
            Delete(examQuestionId);
        }
        private void Delete(int examId)
        {
            studentExamQuestionRepository.Delete(examId);
            studentExamQuestionRepository.Save();
        }
    }
}
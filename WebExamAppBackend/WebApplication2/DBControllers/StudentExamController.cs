using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.Repository;
using WebApplication2.DAL;
using WebApplication2.Models;

namespace WebApplication2.DBControllers
{
    public class StudentExamController
    {
        private StudentExamRepository studentExamRepository = new StudentExamRepository(new Exam_DBPltaform5());

        public StudentExam GetById(int id)
        {
            return studentExamRepository.GetById(id);
        }

        public List<StudentExam> GetAllExams()
        {
            return studentExamRepository.GetAll().ToList();
        }
        public List<StudentExam> GetAllStudentExams(int studentId)
        {
            return studentExamRepository.GetAllStudentExams(studentId).ToList();
        }
        public List<int> GetAllStudentExamIds(int studentId)
        {
            return studentExamRepository.GetAllStudentExamIds(studentId).ToList();
        }
        public List<int> GetAllStudentExamsFromModel(int modelId)
        {
            return studentExamRepository.GetAllStudntExamsFromModel(modelId).ToList();
        }

        public int AddStudentExam(StudentExam model)
        {
            var allExams = studentExamRepository.GetAll();
            int lastId = 0;
            if (allExams.Count()>0)
                lastId = allExams[allExams.Count() - 1].Id;
            model.Id = lastId + 1;
            studentExamRepository.Insert(model);
            studentExamRepository.Save();
            return model.Id;
        }
        public void EditStudentExam(int examId, StudentExam newExam)
        {
            StudentExam model = studentExamRepository.GetById(examId);
            model = newExam;
            EditStudentExam(model);
        }
        private void EditStudentExam(StudentExam model)
        {
            studentExamRepository.Update(model);
            studentExamRepository.Save();

        }
        public void  DeleteStudentExam(int examId)
        {
            StudentExam model = studentExamRepository.GetById(examId);
            if (model == null)
                return;
            Delete(examId);
       
        }
        private void Delete(int examId)
        {
            studentExamRepository.Delete(examId);
            studentExamRepository.Save();
        }
    }
}
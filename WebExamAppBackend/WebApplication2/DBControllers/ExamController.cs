using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.Repository;
using WebApplication2.DAL;
using WebApplication2.Models;

namespace WebApplication2.DBControllers
{
    public class ExamController
    {
       
        private ExamRepository examRepository = new ExamRepository(new Exam_DBPltaform5());

        public Exam GetById(int id)
        {
            return examRepository.GetById(id);
        }
        public List<int> GetAllSubAreaExamIds(int subAreaId)
        {
            return examRepository.GetAllSubAreaExams(subAreaId);
        }
        public List<Exam> GetAllExams()
        {
            return examRepository.GetAll().ToList();
            //return examRepository.GetAll().OrderBy(exam=>exam.fromDate).ToList();
        }
        public List<Exam> GetAllStudentFutureExams(int[] subAreaIds)
        {
            return examRepository.GetAllFutureBySubArea(subAreaIds);
        }
        public List<Exam> GetAllPastGeneralExams(int[] subAreaIds)
        {
            return examRepository.GetAllPastBySubArea(subAreaIds);
        }
        public List<Exam> GetAllStudentPresentExams(int[] subAreaIds, List<int> takenIds)
        {
            return examRepository.GetAllPresentBySubArea(subAreaIds,takenIds);
        }
        public int AddExam(Exam model)
        {
            var allExams = examRepository.GetAll();
            int lastId = 0;
            if (allExams.Count() > 0)
                lastId = allExams[allExams.Count() - 1].Id;
            model.Id = lastId + 1;
            examRepository.Insert(model);
            examRepository.Save();
            return model.Id;
        }
        public void EditExam(int examId, Exam newExam)
        {
            Exam model = examRepository.GetById(examId);
            model = newExam;
            EditExam(model);
        }
        private void EditExam(Exam model)
        {
            examRepository.Update(model);
            examRepository.Save();

        }
        public void DeleteExam(int examId)
        {
            Exam model = examRepository.GetById(examId);
            if (model == null)
                return;
            Delete(examId);
        }
        private void Delete(int examId)
        {
            examRepository.Delete(examId);
            examRepository.Save();
        }

    }
}
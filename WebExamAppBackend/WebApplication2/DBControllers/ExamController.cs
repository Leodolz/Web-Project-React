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
        private QuestionAssignRepository questionAssignRepository = new QuestionAssignRepository(new Exam_DBContext());
        private OptionAssignRepository optionAssignRepository = new OptionAssignRepository(new Exam_DBContext());
        private ExamRepository examRepository = new ExamRepository(new Exam_DBContext());

        public Exam GetById(int id)
        {
            return examRepository.GetById(id);
        }

        public List<Exam> GetAllExams()
        {
            return examRepository.GetAll().ToList();
        }

        public int AddExam(Exam model)
        {
            var allExams = examRepository.GetAll();
            int lastId = allExams[allExams.Count() - 1].Id;
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
        public int AssignNewQuestion(questionAssign assignment)
        {
            var allQuestionAssignments = questionAssignRepository.GetAll();
            int lastId = allQuestionAssignments[allQuestionAssignments.Count() - 1].Id;
            assignment.Id = lastId + 1;
            questionAssignRepository.Insert(assignment);
            questionAssignRepository.Save();
            return lastId;
        }
        public void AssignNewOption(OptionAssign assignment)
        {
            var allOptionAssignments = questionAssignRepository.GetAll();
            int lastId = allOptionAssignments[allOptionAssignments.Count() - 1].Id;
            assignment.Id = lastId + 1;
            optionAssignRepository.Insert(assignment);
            optionAssignRepository.Save();
        }
        public List<questionAssign> GetAllExamQuestions(int examId)
        {
            return questionAssignRepository.GetAllExamQuestions(examId);
        }
        public List<OptionAssign> GetAllQuestionOptions(int questionId)
        {
            return optionAssignRepository.GetAllQuestionOptions(questionId);
        }
    }
}
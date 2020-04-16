using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.Repository;
using WebApplication2.DAL;
using WebApplication2.Models;

namespace WebApplication2.DBControllers
{
    public class QuestionAssignController
    {
        private QuestionAssignRepository questionAssignRepository = new QuestionAssignRepository(new Exam_DatabaseEntities());
        public int AssignNewQuestion(questionAssign assignment)
        {
            var allQuestionAssignments = questionAssignRepository.GetAll();
            int lastId = allQuestionAssignments[allQuestionAssignments.Count() - 1].Id;
            assignment.Id = lastId + 1;
            questionAssignRepository.Insert(assignment);
            questionAssignRepository.Save();
            return lastId;
        }
        public List<questionAssign> GetAllExamQuestions(int examId)
        {
            return questionAssignRepository.GetAllExamQuestions(examId);
        }
        public void EditQuestion(int questionId, questionAssign newQuestion)
        {
            questionAssign model = questionAssignRepository.GetById(questionId);
            model = newQuestion;
            EditQuestion(model);
        }
        private void EditQuestion(questionAssign model)
        {
            questionAssignRepository.Update(model);
            questionAssignRepository.Save();

        }
        public void DeleteQuestion(int questionId)
        {
            questionAssign model = questionAssignRepository.GetById(questionId);
            if (model == null)
                return;
            Delete(questionId);
        }

        private void Delete(int subAreaId)
        {
            questionAssignRepository.Delete(subAreaId);
            questionAssignRepository.Save();
        }
    }
}
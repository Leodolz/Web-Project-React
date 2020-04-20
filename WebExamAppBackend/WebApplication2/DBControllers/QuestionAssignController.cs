using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.Repository;
using WebApplication2.DAL;
using WebApplication2.Models;
using WebApplication2.Utils;

namespace WebApplication2.DBControllers
{
    public class QuestionAssignController
    {
        private QuestionAssignRepository questionAssignRepository = new QuestionAssignRepository(new Exam_DBPlatform());
        public int AssignNewQuestion(questionAssign assignment)
        {
            var allQuestionAssignments = questionAssignRepository.GetAll();
            int lastId = allQuestionAssignments[allQuestionAssignments.Count() - 1].Id;
            assignment.Id = lastId + 1;
            questionAssignRepository.Insert(assignment);
            questionAssignRepository.Save();
            return assignment.Id;
        }
        public questionAssign GetById(int id)
        {
            return questionAssignRepository.GetById(id);
        }
        public List<questionAssign> GetAllExamQuestions(int examId)
        {
            return questionAssignRepository.GetAllExamQuestions(examId);
        }
        public void EditGroupOfQuestions(List<RealExamQuestion> questions, OptionAssignController optionAssignController)
        {
            foreach(RealExamQuestion realQuestion in questions)
            {
                questionAssign question = GetById(realQuestion.questionId);
                EditQuestion(realQuestion.questionId, realQuestion);
                optionAssignController.EditOptionsOfQuestion(realQuestion.questionId, realQuestion.options, realQuestion.answer);
            }
        }
        public void EditQuestion(int questionId, RealExamQuestion newQuestion)
        {
            questionAssign model = questionAssignRepository.GetById(questionId);
            model.title = newQuestion.title;
            model.score = newQuestion.score;
            model.type = newQuestion.type;
            EditQuestion(model);
        }
        private void EditQuestion(questionAssign model)
        {
            questionAssignRepository.Update(model);
            questionAssignRepository.Save();

        }
        public void DeleteQuestions(List<int> ids)
        {
            foreach(int id in ids)
            {
                DeleteQuestion(id);
            }
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
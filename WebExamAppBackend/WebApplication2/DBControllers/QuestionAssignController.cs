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
        private QuestionAssignRepository questionAssignRepository = new QuestionAssignRepository(new Exam_DBPlatform3());
        private StaticQuestionRepository staticQuestionRepository = new StaticQuestionRepository(new Exam_DBPlatform3());
        public int AssignNewQuestion(questionAssign assignment)
        {
            var allQuestionAssignments = questionAssignRepository.GetAll();
            int lastId = 0;
            if (allQuestionAssignments[0] != null)
                lastId = allQuestionAssignments[allQuestionAssignments.Count() - 1].Id;
            assignment.Id = lastId + 1;
            questionAssignRepository.Insert(assignment);
            questionAssignRepository.Save();
            return assignment.Id;
        }
        public int AssignNewStaticQuestion(StaticQuestionAssign assignment)
        {
            var allQuestionAssignments = staticQuestionRepository.GetAll();
            int lastId = allQuestionAssignments[allQuestionAssignments.Count() - 1].Id;
            assignment.Id = lastId + 1;
            staticQuestionRepository.Insert(assignment);
            staticQuestionRepository.Save();
            return assignment.Id;
        }

        public List<questionAssign> GetAllSubAreaQuestions(int subAreaId)
        {
            return questionAssignRepository.GetAllQuestionAssignments(subAreaId);
        }
        public questionAssign GetById(int id)
        {
            return questionAssignRepository.GetById(id);
        }
        public List<questionAssign> GetAllExamQuestions(int examId)
        {
            List<int> allQuestionsId = staticQuestionRepository.GetAllExamQuestionsIds(examId);
            List<questionAssign> allExamQuestions = new List<questionAssign>();
            foreach(int questionId in allQuestionsId)
            {
                allExamQuestions.Add(questionAssignRepository.GetById(questionId));
            }
            return allExamQuestions;
        }
        public void EditGroupOfQuestions(List<RealExamQuestion> questions, OptionAssignController optionAssignController)
        {
            foreach(RealExamQuestion realQuestion in questions)
            {
                questionAssign question = GetById(realQuestion.questionId);
                EditQuestion(realQuestion.questionId, realQuestion);
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
        public void DeleteStaticQuestions(List<int> ids)
        {
            foreach (int id in ids)
            {
                DeleteStaticQuestion(id);
            }
        }
        public void DeleteQuestion(int questionId)
        {
            questionAssign model = questionAssignRepository.GetById(questionId);
            if (model == null)
                return;
            Delete(questionId);
        }
        public void DeleteStaticQuestion(int questionId)
        {
            StaticQuestionAssign model = staticQuestionRepository.GetById(questionId);
            if (model == null)
                return;
            DeleteStatic(questionId);
        }
        private void DeleteStatic(int questionId)
        {
            questionAssignRepository.Delete(questionId);
            questionAssignRepository.Save();
        }
        private void Delete(int id)
        {
            questionAssignRepository.Delete(id);
            questionAssignRepository.Save();
        }
    }
}
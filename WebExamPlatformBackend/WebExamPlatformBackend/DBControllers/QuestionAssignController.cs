using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.Repository;
using WebExamPlatformBackend.Models;
using WebExamPlatformBackend.Utils;

namespace WebExamPlatformBackend.DBControllers
{
    public class QuestionAssignController
    {
        private QuestionAssignRepository questionAssignRepository = new QuestionAssignRepository(new ExamPlatformDBContext());
        private StaticQuestionRepository staticQuestionRepository = new StaticQuestionRepository(new ExamPlatformDBContext());
        public int AssignNewQuestion(QuestionAssign assignment)
        {
            var allQuestionAssignments = questionAssignRepository.GetAll();
            int lastId = 0;
            if (allQuestionAssignments.Count() > 0)
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
        public List<QuestionAssign> GetRandomQuestions(int numberOfQuestions, int subAreaId)
        {
            List<QuestionAssign> randomQuestions = new List<QuestionAssign>();
            List<QuestionAssign> allSubAreaQuestions = GetAllSubAreaQuestions(subAreaId);
            List<int> randomQuestionsCells = NumberUtils.GetSetOfRandomNumbers(allSubAreaQuestions.Count(), numberOfQuestions);
            foreach (int randomQuestionsCell in randomQuestionsCells)
            {
                randomQuestions.Add(allSubAreaQuestions[randomQuestionsCell]);
            }
            return randomQuestions;
        }
        public bool IsQuestionAssigned(int questionId)
        {
            return staticQuestionRepository.IsQuestionAssigned(questionId);
        }
        public List<QuestionAssign> GetAllSubAreaQuestions(int subAreaId)
        {
            return questionAssignRepository.GetAllQuestionAssignments(subAreaId);
        }
        public QuestionAssign GetById(int id)
        {
            return questionAssignRepository.GetById(id);
        }
        public QuestionAssign GetStaticInExam(int examId, int id)
        {
            StaticQuestionAssign staticQuestion = staticQuestionRepository.GetStaticInExam(examId, id);
            if (staticQuestion != null)
                return GetById(staticQuestion.questionId);
            else return null;
        }
        public StaticQuestionAssign GetStaticById(int id)
        {
            return staticQuestionRepository.GetById(id);
        }
        public List<StaticQuestionAssign> GetAllStaticInExam(int examId)
        {
            return staticQuestionRepository.GetAllStaticExamQuestions(examId);
        }
        public List<QuestionAssign> GetAllExamQuestions(int examId)
        {
            List<int> allQuestionsId = staticQuestionRepository.GetAllExamQuestions(examId);
            List<QuestionAssign> allExamQuestions = new List<QuestionAssign>();
            foreach (int questionId in allQuestionsId)
            {
                System.Diagnostics.Debug.WriteLine("Question in exam is:" + questionId);
                allExamQuestions.Add(questionAssignRepository.GetById(questionId));
            }
            return allExamQuestions;
        }
        public void EditGroupOfQuestions(List<RealExamQuestion> questions, OptionAssignController optionAssignController)
        {
            foreach (RealExamQuestion realQuestion in questions)
            {
                QuestionAssign question = GetById(realQuestion.questionId);
                EditQuestion(realQuestion.questionId, realQuestion);
                optionAssignController.EditOptionsOfQuestion(realQuestion.questionId, realQuestion.options, realQuestion.answer);
            }
        }
        public void EditQuestion(int questionId, RealExamQuestion newQuestion)
        {
            QuestionAssign model = questionAssignRepository.GetById(questionId);
            model.title = newQuestion.title;
            model.score = newQuestion.score;
            model.type = newQuestion.type;
            EditQuestion(model);
        }
        private void EditQuestion(QuestionAssign model)
        {
            questionAssignRepository.Update(model);
            questionAssignRepository.Save();

        }
        public void DeleteQuestions(List<int> ids)
        {
            foreach (int id in ids)
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
            QuestionAssign model = questionAssignRepository.GetById(questionId);
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
            staticQuestionRepository.Delete(questionId);
            staticQuestionRepository.Save();
        }
        private void Delete(int id)
        {
            questionAssignRepository.Delete(id);
            questionAssignRepository.Save();
        }
    }

}


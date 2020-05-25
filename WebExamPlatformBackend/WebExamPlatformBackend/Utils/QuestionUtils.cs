using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.Models;
using WebExamPlatformBackend.DBControllers;

namespace WebExamPlatformBackend.Utils
{
    public static class QuestionUtils
    {
        public static List<RealExamQuestion> GetExistingQuestions(RealExamQuestion[] allQuestions, QuestionAssignController questionAssignController)
        {
            List<RealExamQuestion> existingQuestions = new List<RealExamQuestion>();
            foreach (RealExamQuestion question in allQuestions)
            {
                QuestionAssign existingQuestion = questionAssignController.GetById(question.questionId);
                if (existingQuestion != null)
                    existingQuestions.Add(question);
            }
            return existingQuestions;
        }
        public static List<RealExamQuestion> GetRemainingQuestions(int examId, RealExamQuestion[] allQuestions, QuestionAssignController questionAssignController)
        {
            List<RealExamQuestion> remainingQuestions = new List<RealExamQuestion>();
            foreach (RealExamQuestion question in allQuestions)
            {
                QuestionAssign existingQuestion = questionAssignController.GetStaticInExam(examId, question.questionId);
                if (existingQuestion != null)
                    remainingQuestions.Add(question);
            }
            return remainingQuestions;
        }
        public static List<RealExamQuestion> FilterQuestions(RealExamQuestion[] allRealQuestions, RealExamQuestion[] unWishedQuestions)
        {
            List<RealExamQuestion> filteredQuestions = new List<RealExamQuestion>();
            foreach (RealExamQuestion question in allRealQuestions)
            {
                if (!unWishedQuestions.Contains(question))
                    filteredQuestions.Add(question);
            }
            return filteredQuestions;
        }
        public static List<int> DeleteMissingStaticQuestions(List<StaticQuestionAssign> oldQuestions, List<RealExamQuestion> actualQuestions)
        {
            List<int> actualQuestionsIds = GetRealQuestionsIds(actualQuestions);
            List<int> deletedQuestionsIds = new List<int>();
            foreach (StaticQuestionAssign listElement in oldQuestions)
            {
                if (!actualQuestionsIds.Contains(listElement.questionId))
                    deletedQuestionsIds.Add(listElement.Id);
            }
            return deletedQuestionsIds;
        }
        public static List<int> DeleteMissingQuestions(List<QuestionAssign> oldQuestions, List<RealExamQuestion> actualQuestions, List<RealExamQuestion> noNoList)
        {
            List<int> actualQuestionsIds = GetRealQuestionsIds(actualQuestions);
            List<int> unDeleteableIds = GetRealQuestionsIds(noNoList);
            List<int> deletedQuestionsIds = new List<int>();
            foreach (QuestionAssign listElement in oldQuestions)
            {
                if (!actualQuestionsIds.Contains(listElement.Id) && !unDeleteableIds.Contains(listElement.Id))
                    deletedQuestionsIds.Add(listElement.Id);
            }
            return deletedQuestionsIds;
        }
        private static List<int> GetRealQuestionsIds(List<RealExamQuestion> realQuestions)
        {
            List<int> allIds = new List<int>();
            foreach (RealExamQuestion realQuestion in realQuestions)
            {
                allIds.Add(realQuestion.questionId);
            }
            return allIds;
        }


    }
}

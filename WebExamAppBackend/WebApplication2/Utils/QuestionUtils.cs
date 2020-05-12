using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.Models;
using WebApplication2.DBControllers;

namespace WebApplication2.Utils
{
    public static class QuestionUtils
    {
        public static List<RealExamQuestion> GetExistingQuestions(RealExamQuestion[] allQuestions, QuestionAssignController questionAssignController)
        {
            List<RealExamQuestion> existingQuestions = new List<RealExamQuestion>();
            foreach (RealExamQuestion question in allQuestions)
            {
                questionAssign existingQuestion = questionAssignController.GetById(question.questionId);
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
                questionAssign existingQuestion = questionAssignController.GetStaticInExam(examId,question.questionId);
                if (existingQuestion != null)
                    remainingQuestions.Add(question);
            }
            return remainingQuestions;
        }
        public static List<RealExamQuestion> FilterQuestions (RealExamQuestion[] allRealQuestions, RealExamQuestion[] unWishedQuestions)
        {
            List<RealExamQuestion> filteredQuestions = new List<RealExamQuestion>();
            foreach(RealExamQuestion question in allRealQuestions)
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
        public static List<int> DeleteMissingQuestions(List<questionAssign> oldQuestions, List<RealExamQuestion> actualQuestions, List<RealExamQuestion> noNoList)
        {
            List<int> actualQuestionsIds = GetRealQuestionsIds(actualQuestions);
            List<int> unDeleteableIds = GetRealQuestionsIds(noNoList);
            List<int> deletedQuestionsIds = new List<int>();
            foreach (questionAssign listElement in oldQuestions)
            {
                if (!actualQuestionsIds.Contains(listElement.Id) && !unDeleteableIds.Contains(listElement.Id))
                    deletedQuestionsIds.Add(listElement.Id);
            }
            return deletedQuestionsIds;
        }
        private static List<int> GetRealQuestionsIds(List<RealExamQuestion> realQuestions)
        {
            List<int> allIds = new List<int>();
            foreach(RealExamQuestion realQuestion in realQuestions)
            {
                allIds.Add(realQuestion.questionId);
            }
            return allIds;
        }


    }
}
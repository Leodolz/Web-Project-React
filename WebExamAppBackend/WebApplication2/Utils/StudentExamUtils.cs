using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.Models;
using WebApplication2.DBControllers;

namespace WebApplication2.Utils
{
    public class StudentExamUtils
    {
        public static RealExamQuestion[] GetAllStudentExamElements(ExamController examController, int examId, QuestionAssignController questionAssignController, OptionAssignController optionAssignController, StudentExamQuestionController studentExamQuestionController)
        {
            List<RealExamQuestion> allExamElements = new List<RealExamQuestion>();
            List<questionAssign> allQuestions = questionAssignController.GetAllExamQuestions(examId);
            foreach (questionAssign question in allQuestions)
            {
                StudentQuestionTable studentExamQuestion = studentExamQuestionController.GetByModelQuestionId(question.Id);
                allExamElements.Add(GetExamElement(question, optionAssignController.GetAllQuestionOptions(question.Id), studentExamQuestion, optionAssignController));
            }
            return allExamElements.ToArray();
        }
        public static RealExamQuestion GetExamElement(questionAssign question, List<OptionAssign> allOptions, StudentQuestionTable studentExamQuestion, OptionAssignController optionAssignController)
        {
            if (studentExamQuestion == null)
                studentExamQuestion = GetNewStudentExamQuestion(question);
            return new RealExamQuestion
            {
                type = question.type,
                title = question.title,
                multiple = question.type == "Single" ? false : true,
                options = OptionUtils.OptionsToStrings(allOptions),
                studentAnswer = GetStudentAnswers(studentExamQuestion, optionAssignController),
                answer = OptionUtils.OptionsToAnswers(allOptions),
                score = studentExamQuestion.score,
                questionId = question.Id,
            };
        }
        private static string[] GetStudentAnswers(StudentQuestionTable studentExamQuestion, OptionAssignController optionAssignController)
        {
            if (studentExamQuestion == null)
                return new string[] {""};
            string[] studentAnswerIds = studentExamQuestion.studentAnswerIds.Split(',');
            List<int> answerIds = new List<int>();
            foreach(string studentAnswerId in studentAnswerIds)
            {
                int.TryParse(studentAnswerId, out int result);
                answerIds.Add(result);
            }
            List<string> answers = new List<string>();
            foreach(int answerId in answerIds)
            {
                OptionAssign answer = optionAssignController.GetById(answerId);
                if (answer != null)
                    answers.Add(answer.optionTitle);
            }
            return answers.ToArray();
        }
        public static StudentQuestionTable GetNewStudentExamQuestion(questionAssign question)
        {
            return new StudentQuestionTable
            {
                score = question.score,
                questionId = question.Id,
                studentAnswerIds = "",
                studentExamId = question.examId
            };
        }
    }
}
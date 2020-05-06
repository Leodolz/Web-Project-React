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
        public static RealExamQuestion[] GetAllStudentExamElements(int studentExamId, ExamController examController, List<questionAssign> allQuestions, QuestionAssignController questionAssignController, OptionAssignController optionAssignController, StudentExamQuestionController studentExamQuestionController)
        {
            List<RealExamQuestion> allExamElements = new List<RealExamQuestion>();
            foreach (questionAssign question in allQuestions)
            {
                StudentQuestionTable studentExamQuestion = studentExamQuestionController.GetByModelQuestionId(question.Id,studentExamId);
                allExamElements.Add(GetExamElement(question, optionAssignController.GetAllQuestionOptions(question.Id), studentExamQuestion, optionAssignController));
            }
            return allExamElements.ToArray();
        }
        public static RealExamQuestion GetExamElement(questionAssign question, List<OptionAssign> allOptions, StudentQuestionTable studentExamQuestion, OptionAssignController optionAssignController)
        {
            return new RealExamQuestion
            {
                type = question.type,
                title = question.title,
                multiple = question.type == "Single" ? false : true,
                options = OptionUtils.OptionsToStrings(allOptions),
                studentAnswer = GetStudentAnswers(studentExamQuestion, optionAssignController),
                answer = OptionUtils.OptionsToAnswers(allOptions),
                studentScore = studentExamQuestion.score,
                score = question.score,
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
       
        public static StudentQuestionTable RealQuestionToStudentQuestion(RealExamQuestion question, int score, int examId, OptionAssignController optionAssignController)
        {
            string[] studentAnswers = question.answer;
            List<string> studentAnswersIds = new List<string>();
            foreach(string studentAnswer in studentAnswers)
            {
                studentAnswersIds.Add(optionAssignController.GetByNameAndQuestionId(studentAnswer, question.questionId).Id.ToString());
            }
            return new StudentQuestionTable
            {
                score = score,
                questionId = question.questionId,
                studentAnswerIds = string.Join(",", studentAnswersIds.ToArray()),
                studentExamId = examId
            };
        }
        public static StudentExam NewRealExamToStudentExam(RealExam exam, int score, int studentId)
        {
            return new StudentExam
            {
                examId = exam.Id,
                score = score,
                studentId = studentId
            };
        }
        public static Dictionary<string,float> EvaulateExam(RealExam studentExam, RealExam modelExam)
        {
            Dictionary<string,float> questionScores = new Dictionary<string,float>();

            RealExamQuestion[] allQuestions = modelExam.examElements;
            float totalScore = 0;
            float perfectScore = 0;
            for (int i = 0; i < allQuestions.Count(); i++)
            {
                perfectScore = perfectScore + allQuestions[i].score;
                float questionPoints = 0;
                float totalQuestionScore = allQuestions[i].score;
                float individualPoints = totalQuestionScore / allQuestions[i].answer.Count();
                foreach (string validAnswer in allQuestions[i].answer)
                {
                    if (studentExam.examElements[i].answer.Contains(validAnswer))
                        questionPoints = questionPoints + individualPoints;
                }
                questionScores.Add(studentExam.examElements[i].title,questionPoints);
                totalScore = totalScore + questionPoints;
            }
            totalScore = (totalScore / perfectScore) * 100;
            questionScores.Add("~totalScore", totalScore);
            return questionScores;
        }

    }
}
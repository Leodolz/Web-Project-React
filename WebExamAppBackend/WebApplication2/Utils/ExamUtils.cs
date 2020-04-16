using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.Models;
using WebApplication2.DBControllers;

namespace WebApplication2.Utils
{
    public static class ExamUtils
    {
        public static RealExam ExamToRealExam(Exam exam, RealExamQuestion[] questions, SubAreaController subAreaController, AreaController areaController)
        {
            SubArea subArea = subAreaController.GetById(exam.subAreaId);
            Area currentArea = areaController.getById(subArea.parentAreaId);
            string areaName = currentArea.name;
            return new RealExam
            {
                Id = exam.Id,
                fromDate = exam.fromDate.ToShortDateString()+" " + exam.fromDate.ToLongTimeString(),
                untilDate = exam.untilDate.ToShortDateString() + " " + exam.untilDate.ToLongTimeString(),
                title = exam.title,
                subAreaId = exam.subAreaId,
                subarea = subArea.name,
                area = areaName,
                areaId = currentArea.Id,
                examElements = questions
            };
        }
        public static RealExamQuestion GetExamElement(questionAssign question, List<OptionAssign> allOptions)
        {
            return new RealExamQuestion
            {
                type = question.type,
                title = question.title,
                multiple = question.type=="Single"?false:true,
                options = OptionsToStrings(allOptions),
                answer = OptionsToAnswers(allOptions),
                score = question.score
            };
        }
        private static string[] OptionsToStrings(List<OptionAssign> allOptions)
        {
            List<string> options = new List<string>();
            foreach(OptionAssign option in allOptions)
            {
                options.Add(option.optionTitle);
            }
            return options.ToArray();

        }
        private static string[] OptionsToAnswers(List<OptionAssign> allOptions)
        {
            List<string> answers = new List<string>();
            foreach (OptionAssign option in allOptions)
            {
                if(option.answer[0] == 1)
                    answers.Add(option.optionTitle);
            }
            return answers.ToArray();

        }

        public static RealExamQuestion[] GetAllExamElements(ExamController examController, int examId)
        {
            List<RealExamQuestion> allExamElements = new List<RealExamQuestion>();
            List<questionAssign> allQuestions = examController.GetAllExamQuestions(examId);
            foreach (questionAssign question in allQuestions)
            {
                allExamElements.Add(GetExamElement(question,examController.GetAllQuestionOptions(question.Id)));
            }
            return allExamElements.ToArray();
        }
        public static Exam NewRealExamToExam(RealExam exam)
        {
            return new Exam
            {
                fromDate = DateTime.Parse(exam.fromDate),
                untilDate = DateTime.Parse(exam.untilDate),
                subAreaId = exam.subAreaId,
                title = exam.title,
                totalScore = exam.totalScore
            };
        }
    }
}
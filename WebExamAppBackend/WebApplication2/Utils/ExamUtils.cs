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
        private static RealExamQuestion GetQuestionElement(questionAssign question, List<OptionAssign> allOptions)
        {
            return new RealExamQuestion
            {
                type = question.type,
                title = question.title,
                multiple = question.type=="Single"?false:true,
                options = OptionUtils.OptionsToStrings(allOptions),
                answer = OptionUtils.OptionsToAnswers(allOptions),
                score = question.score,
                questionId = question.Id,
            };
        }
       
       
        public static RealExamQuestion[] GetAllQuestionElements(List<questionAssign> allQuestions, OptionAssignController optionAssignController)
        {
            List<RealExamQuestion> allExamElements = new List<RealExamQuestion>();
            foreach (questionAssign question in allQuestions)
            {
                allExamElements.Add(GetQuestionElement(question,optionAssignController.GetAllQuestionOptions(question.Id)));
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
                totalScore = exam.totalScore,
                staticQuestions = exam.staticQuestions,
            };
        }
        public static Exam EditedRealToExam(RealExam editedReal, ExamController examController)
        {
            Exam editedExam = examController.GetById(editedReal.Id);
            editedExam.fromDate = DateTime.Parse(editedReal.fromDate);
            editedExam.untilDate = DateTime.Parse(editedReal.untilDate);
            editedExam.subAreaId = editedReal.subAreaId;
            editedExam.title = editedReal.title;
            return editedExam;
        }

       
    }
}
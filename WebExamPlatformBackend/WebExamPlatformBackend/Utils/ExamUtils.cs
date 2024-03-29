﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.Models;
using WebExamPlatformBackend.DBControllers;
using WebExamPlatformBackend.Proxies;

namespace WebExamPlatformBackend.Utils
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
                fromDate = exam.fromDate.ToShortDateString() + " " + exam.fromDate.ToLongTimeString(),
                untilDate = exam.untilDate.ToShortDateString() + " " + exam.untilDate.ToLongTimeString(),
                title = exam.title,
                subAreaId = exam.subAreaId,
                subarea = subArea.name,
                area = areaName,
                areaId = currentArea.Id,
                examElements = questions,
                staticQuestions = exam.staticQuestions,
                numberQuestions = exam.numberQuestions,
            };
        }
        private static RealExamQuestion GetQuestionElement(QuestionAssign question, List<OptionAssign> allOptions)
        {
            return new RealExamQuestion
            {
                type = question.type,
                title = question.title,
                multiple = question.type == "Single" ? false : true,
                options = OptionUtils.OptionsToRealOptions(allOptions),
                answer = OptionUtils.OptionsToAnswers(allOptions),
                score = question.score,
                questionId = question.Id,
            };
        }


        public static RealExamQuestion[] GetAllQuestionElements(List<QuestionAssign> allQuestions, OptionAssignController optionAssignController)
        {
            List<RealExamQuestion> allExamElements = new List<RealExamQuestion>();
            foreach (QuestionAssign question in allQuestions)
            {
                System.Diagnostics.Debug.WriteLine("ExamQuestion: " + question.Id);
                allExamElements.Add(GetQuestionElement(question, optionAssignController.GetAllQuestionOptions(question.Id)));
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
                numberQuestions = exam.numberQuestions,
                staticQuestions = exam.staticQuestions,
            };
        }
        public static Exam EditedRealToExam(RealExam editedReal, ExamController examController)
        {
            Exam editedExam = examController.GetById(editedReal.Id);
            editedExam.fromDate = DateTime.Parse(editedReal.fromDate);
            editedExam.untilDate = DateTime.Parse(editedReal.untilDate);
            editedExam.subAreaId = editedReal.subAreaId;
            editedExam.staticQuestions = editedReal.staticQuestions;
            editedExam.numberQuestions = editedReal.numberQuestions;
            editedExam.title = editedReal.title;
            return editedExam;
        }

        public static RealExam[] GetRealExamArray(List<Exam> allExams, RealExamProxy realExamProxy)
        {
            List<RealExam> allRealExams = new List<RealExam>();
            foreach (Exam exam in allExams)
            {
                allRealExams.Add(realExamProxy.GetRealExam(exam.Id));
            }
            return allRealExams.ToArray();
        }
    }
}

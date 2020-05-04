﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.Models;
using WebApplication2.Utils;
using WebApplication2.Proxies;

namespace WebApplication2.DBControllers
{
    public class RealExamController
    {
        private ExamController examController = new ExamController();
        private StudentExamController studentExamController = new StudentExamController();
        private StudentExamQuestionController studentExamQuestionController = new StudentExamQuestionController();
        private QuestionAssignController questionAssignController = new QuestionAssignController();
        private OptionAssignController optionAssignController = new OptionAssignController();
        public RealExam[] GetAllRealExams(RealExamProxy realExamProxy)
        {
            List<Exam> allExams = examController.GetAllExams();
            List<RealExam> allRealExams = new List<RealExam>();
            foreach(Exam exam in allExams)
            {
                allRealExams.Add(realExamProxy.GetRealExam(exam.Id));
            }
            return allRealExams.ToArray();
        }
        public void DeleteExam(int examId)
        {
            studentExamController.GetAllStudentExamsFromModel(examId);
            examController.DeleteExam(examId);
        }
        public RealExam[] GetAllStudentFutureExams(RealExamProxy realExamProxy, int studentId)
        {
            SubAreaController subAreaController = new SubAreaController();
            List<SubArea> userSubAreas = subAreaController.GetUserSubAreas(studentId);
            int[] subAreaIds = SubAreaUtils.SubAreasToSubAreaIds(userSubAreas).ToArray();
            List<Exam> allExams = examController.GetAllStudentFutureExams(subAreaIds);
            List<RealExam> allRealExams = new List<RealExam>();
            foreach (Exam exam in allExams)
            {
                allRealExams.Add(realExamProxy.GetRealExam(exam.Id));
            }
            return allRealExams.ToArray();
        }
        public RealExam[] GetAllStudentPresentExams(RealExamProxy realExamProxy, int studentId)
        {
            SubAreaController subAreaController = new SubAreaController();
            List<SubArea> userSubAreas = subAreaController.GetUserSubAreas(studentId);
            int[] subAreaIds = SubAreaUtils.SubAreasToSubAreaIds(userSubAreas).ToArray();
            List<int> allTakenExamIds = studentExamController.GetAllStudentExamIds(studentId);
            List<Exam> allExams = examController.GetAllStudentPresentExams(subAreaIds,allTakenExamIds);
            List<RealExam> allRealExams = new List<RealExam>();
            foreach (Exam exam in allExams)
            {
                allRealExams.Add(realExamProxy.GetRealExam(exam.Id));
            }
            return allRealExams.ToArray();
        }
        public RealExam[] GetAllPastStudentExams(RealExamProxy realExamProxy, int studentId)
        {
            List<StudentExam> allExams = studentExamController.GetAllStudentExams(studentId);
            List<RealExam> allRealExams = new List<RealExam>();
            foreach (StudentExam exam in allExams)
            {
                allRealExams.Add(realExamProxy.GetStudentExam(exam.Id));
            }
            return allRealExams.ToArray();
        }
        public int GetModelId(int studentExamId)
        {
            return studentExamController.GetById(studentExamId).examId;
        }
        public RealExam GetRandomExam(Exam exam)
        {
            List<questionAssign> allExamQuestions = questionAssignController.GetRandomQuestions(exam.numberQuestions, exam.subAreaId);
            return GetRealExam(exam, allExamQuestions);
        }
        public RealExam GetRandomExamModel(RealExam exam)
        {
            foreach(RealExamQuestion question in exam.examElements)
            {
                List<string> answers = new List<string>();
                List<OptionAssign> modelOptions = optionAssignController.GetAllQuestionOptions(question.questionId);
                foreach(OptionAssign option in modelOptions)
                {
                    if (option.answer[0] == 1)
                        answers.Add(option.optionTitle);
                }
                question.answer = answers.ToArray();
            }
            return exam;
        }
        public RealExam GetStaticExam(Exam exam)
        {
            List<questionAssign> allExamQuestions = questionAssignController.GetAllExamQuestions(exam.Id);
            return GetRealExam(exam, allExamQuestions);
        }
        private RealExam GetRealExam(Exam exam, List<questionAssign> allExamQuestions)
        {
            RealExamQuestion[] questions = ExamUtils.GetAllQuestionElements(allExamQuestions, optionAssignController);
            return ExamUtils.ExamToRealExam(exam, questions, new SubAreaController(), new AreaController());
        }
        public RealExam GetStudentExam(StudentExam exam)
        {
            Exam modelExam = examController.GetById(exam.examId);
            List<questionAssign> allStudentExamQuestions;
            if (modelExam.staticQuestions)
                allStudentExamQuestions = questionAssignController.GetAllExamQuestions(modelExam.Id);
            else allStudentExamQuestions = GetStudentRandomedExamQuestions(exam.Id);
            RealExamQuestion[] questions = StudentExamUtils.GetAllStudentExamElements(examController, allStudentExamQuestions, questionAssignController, optionAssignController,studentExamQuestionController);
            RealExam realExam =  ExamUtils.ExamToRealExam(modelExam, questions, new SubAreaController(), new AreaController());
            realExam.studentTotalScore = exam.score;
            return realExam;
        }
        //Should be at Student Utils
        private List<questionAssign> GetStudentRandomedExamQuestions(int studentExamId)
        {
            List<int> allExamQuestionsIds = studentExamQuestionController.GetAllExamQuestions(studentExamId);
            List<questionAssign> allQuestions = new List<questionAssign>();
            foreach (int questionId in allExamQuestionsIds)
            {
                allQuestions.Add(questionAssignController.GetById(questionId));
            }
            return allQuestions;
        }

        public void AddExam(Exam model, RealExamQuestion[] questions)
        {
            int examId = examController.AddExam(model);
            if (model.staticQuestions)
                AssignQuestionsToExam(examId, questions);
        }
        
        
        public void EditExamQuestions(RealExamQuestion[] questions, int examId)
        {
            QuestionEditActions(questions,examId);

        }
        private void QuestionEditActions(RealExamQuestion[] newQuestions,int examId)
        { 
            List<RealExamQuestion> remainedQuestions = QuestionUtils.GetRemainingQuestions(examId,newQuestions, questionAssignController);
            /*questionAssignController.EditGroupOfQuestions(editedQuestions, optionAssignController);*/
            List<StaticQuestionAssign> oldQuestions = questionAssignController.GetAllStaticInExam(examId);
            List<int> deletedQuestionsIds = QuestionUtils.DeleteMissingStaticQuestions(oldQuestions, newQuestions.ToList());
            questionAssignController.DeleteStaticQuestions(deletedQuestionsIds);
            List<RealExamQuestion> newQuestionAssignments = QuestionUtils.FilterAndConvertQuestions(newQuestions, remainedQuestions.ToArray());
            AssignQuestionsToExam(examId,newQuestionAssignments.ToArray());
        }
        //Should be at QuestionsUtils
        private List<int> AssignQuestionsToExam(int examId, RealExamQuestion[] questions)
        {
            List<int> allQuestionsIds = new List<int>();
            foreach (RealExamQuestion question in questions)
            {
                System.Diagnostics.Debug.WriteLine("Assigning new question:" + question.questionId);
                StaticQuestionAssign staticQuestionAssign = new StaticQuestionAssign
                {
                    examId = examId,
                    questionId = question.questionId,
                };
                allQuestionsIds.Add(questionAssignController.AssignNewStaticQuestion(staticQuestionAssign));
            }
            return allQuestionsIds;
        }
       
       
       
       
    }
}
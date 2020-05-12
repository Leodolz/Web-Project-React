using System;
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
       
        public void DeleteExam(int examId)
        {
            studentExamController.GetAllStudentExamsFromModel(examId);
            examController.DeleteExam(examId);
        }

        public RealExam[] GetAllRealExams(RealExamProxy realExamProxy)
        {
            List<Exam> allExams = examController.GetAllExams();
            return ExamUtils.GetRealExamArray(allExams, realExamProxy);
        }
        public RealExam[] GetAllTeacherPastExams(RealExamProxy realExamProxy, int teacherId)
        {
            int[] subAreaIds = GetUserSubAreasIds(teacherId);

            List<Exam> allExams = examController.GetAllPastGeneralExams(subAreaIds);

            return ExamUtils.GetRealExamArray(allExams, realExamProxy);
        }

        public RealExam[] GetAllStudentFutureExams(RealExamProxy realExamProxy, int studentId)
        {
            int[] subAreaIds = GetUserSubAreasIds(studentId);
            List<Exam> allExams = examController.GetAllStudentFutureExams(subAreaIds);
            return ExamUtils.GetRealExamArray(allExams, realExamProxy);
        }
        public RealExam[] GetAllStudentPresentExams(RealExamProxy realExamProxy, int studentId)
        {
            int[] subAreaIds = GetUserSubAreasIds(studentId);
            List<int> allTakenExamIds = studentExamController.GetAllStudentExamIds(studentId);
            List<Exam> allExams = examController.GetAllStudentPresentExams(subAreaIds,allTakenExamIds);

            return ExamUtils.GetRealExamArray(allExams, realExamProxy);
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
        private int[] GetUserSubAreasIds(int userId)
        {
            SubAreaController subAreaController = new SubAreaController();
            List<SubArea> userSubAreas = subAreaController.GetUserSubAreas(userId);
            return SubAreaUtils.SubAreasToSubAreaIds(userSubAreas).ToArray();
        }


        public RealExam GetRandomExam(Exam exam)
        {
            List<questionAssign> allExamQuestions = questionAssignController.GetRandomQuestions(exam.numberQuestions, exam.subAreaId);
            return GetRealExam(exam, allExamQuestions);
        }
        public RealExam GetStudentExam(StudentExam exam)
        {
            Exam modelExam = examController.GetById(exam.examId);
            List<questionAssign> allStudentExamQuestions = GetStudentExamQuestions(exam.Id);
            RealExamQuestion[] questions = StudentExamUtils.GetAllStudentExamElements(exam.Id, examController, allStudentExamQuestions, questionAssignController, optionAssignController, studentExamQuestionController);
            RealExam realExam = ExamUtils.ExamToRealExam(modelExam, questions, new SubAreaController(), new AreaController());
            realExam.studentTotalScore = exam.score;
            return realExam;
        }
     
        public RealExam GetRandomExamModel(RealExam exam)
        {
            RealExam studentExamCopy = new RealExam(exam);
            foreach(RealExamQuestion question in studentExamCopy.examElements)
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
            return studentExamCopy;
        }
        public RealExam GetStaticExamModel(Exam exam)
        {
            List<questionAssign> allExamQuestions = questionAssignController.GetAllExamQuestions(exam.Id);
            return GetRealExam(exam, allExamQuestions);
        }
        private RealExam GetRealExam(Exam exam, List<questionAssign> allExamQuestions)
        {
            RealExamQuestion[] questions = ExamUtils.GetAllQuestionElements(allExamQuestions, optionAssignController);
            return ExamUtils.ExamToRealExam(exam, questions, new SubAreaController(), new AreaController());
        }

        private List<questionAssign> GetStudentExamQuestions(int studentExamId)
        {
            List<int> allExamQuestionsIds = studentExamQuestionController.GetAllExamQuestions(studentExamId);
            List<questionAssign> allQuestions = new List<questionAssign>();
            foreach (int questionId in allExamQuestionsIds)
            {
                allQuestions.Add(questionAssignController.GetById(questionId));
            }
            return allQuestions;
        }


        //Admin actions
        public void AddExam(Exam model, RealExamQuestion[] questions)
        {
            int examId = examController.AddExam(model);
            if (model.staticQuestions)
                AssignStaticQuestionsToExam(examId, questions);
        }
        
        
        public void EditExamQuestions(RealExamQuestion[] questions, int examId)
        {
            QuestionEditActions(questions,examId);

        }
        private void QuestionEditActions(RealExamQuestion[] newQuestions,int examId)
        { 
            List<RealExamQuestion> remainedQuestions = QuestionUtils.GetRemainingQuestions(examId,newQuestions, questionAssignController);
            List<StaticQuestionAssign> oldQuestions = questionAssignController.GetAllStaticInExam(examId);
            List<int> deletedQuestionsIds = QuestionUtils.DeleteMissingStaticQuestions(oldQuestions, newQuestions.ToList());
            questionAssignController.DeleteStaticQuestions(deletedQuestionsIds);
            List<RealExamQuestion> newQuestionAssignments = QuestionUtils.FilterQuestions(newQuestions, remainedQuestions.ToArray());
            AssignStaticQuestionsToExam(examId,newQuestionAssignments.ToArray());
        }

        private List<int> AssignStaticQuestionsToExam(int examId, RealExamQuestion[] questions)
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
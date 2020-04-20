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
        public RealExam[] GetAllStudentExams(RealExamProxy realExamProxy, int studentId)
        {
            List<StudentExam> allExams = studentExamController.GetAllStudentExams(studentId);
            List<RealExam> allRealExams = new List<RealExam>();
            foreach (StudentExam exam in allExams)
            {
                allRealExams.Add(realExamProxy.GetStudentExam(exam.Id));
            }
            return allRealExams.ToArray();
        }
        public RealExam GetRealExam(Exam exam)
        {
            RealExamQuestion[] questions = ExamUtils.GetAllExamElements(examController, exam.Id, questionAssignController, optionAssignController);
            return ExamUtils.ExamToRealExam(exam, questions, new SubAreaController(), new AreaController());
        }
        public RealExam GetStudentExam(StudentExam exam)
        {
            Exam modelExam = examController.GetById(exam.examId);
            RealExamQuestion[] questions = StudentExamUtils.GetAllStudentExamElements(examController, modelExam.Id, questionAssignController, optionAssignController,studentExamQuestionController);
            RealExam realExam =  ExamUtils.ExamToRealExam(modelExam, questions, new SubAreaController(), new AreaController());
            realExam.studentTotalScore = exam.score;
            realExam.totalScore = 100;
            return realExam;
        }

        public void AddExam(Exam model, RealExamQuestion[] questions)
        {
            int examId = examController.AddExam(model);
            AssignNewQuestionsToExam(questions, examId);
        }
        private void AssignNewQuestionsToExam(RealExamQuestion[] questions, int examId)
        {
            List<int> allQuestionsIds = AssignQuestionsToExam(examId, questions);
            for (int i = 0; i < allQuestionsIds.Count; i++)
            {
                System.Diagnostics.Debug.WriteLine("Iteration at question with id: " + allQuestionsIds[i]);
                AssignOptionsToQuestion(allQuestionsIds[i], questions[i].options, questions[i].answer);
            }
        }
        public void EditExam(RealExamQuestion[] questions, int id)
        {
            QuestionEditActions(questions,id);

        }
        private void QuestionEditActions(RealExamQuestion[] newQuestions,int examId)
        { 
            List<RealExamQuestion> editedQuestions = QuestionUtils.GetExistingQuestions(newQuestions, questionAssignController);
            questionAssignController.EditGroupOfQuestions(editedQuestions, optionAssignController);
            List<questionAssign> oldQuestions = questionAssignController.GetAllExamQuestions(examId);
            List<int> deletedQuestionsIds = QuestionUtils.DeleteMissingQuestions(oldQuestions, newQuestions.ToList());
            questionAssignController.DeleteQuestions(deletedQuestionsIds);
            List<RealExamQuestion> newQuestionAssignments = QuestionUtils.FilterAndConvertQuestions(newQuestions, editedQuestions.ToArray());
            AssignNewQuestionsToExam(newQuestionAssignments.ToArray(), examId);
        }
        //Should be at QuestionsUtils
        private List<int> AssignQuestionsToExam(int examId, RealExamQuestion[] questions)
        {
            List<int> allQuestionsIds = new List<int>();
            foreach (RealExamQuestion question in questions)
            {
                questionAssign questionAssign = new questionAssign
                {
                    examId = examId,
                    title = question.title,
                    type = question.type,
                    score = question.score,
                };
                allQuestionsIds.Add(questionAssignController.AssignNewQuestion(questionAssign));
            }
            return allQuestionsIds;
        }
        private void AssignOptionsToQuestion(int questionId, string[] options, string[] answers)
        {
            foreach (string option in options)
            {
                OptionAssign optionAssign = OptionUtils.OptionToOptionAssign(questionId, option, answers);
                optionAssignController.AssignNewOption(optionAssign);
            }
        }
       
       
    }
}
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
        public RealExam GetRealExam(Exam exam)
        {
            RealExamQuestion[] questions = ExamUtils.GetAllExamElements(examController, exam.Id);
            return ExamUtils.ExamToRealExam(exam, questions, new SubAreaController(), new AreaController());
        }
        
        public void AddExam(Exam model, RealExamQuestion[] questions)
        {
            int examId = examController.AddExam(model);
            List<int> allQuestionsIds = AssignQuestionsToExam(examId, questions);
            for(int i=0;i<allQuestionsIds.Count; i++)
            {
                AssignOptionsToQuestion(allQuestionsIds[i], questions[i].options, questions[i].answer);
            }
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
                    type = question.type
                };
                allQuestionsIds.Add(examController.AssignNewQuestion(questionAssign));
            }
            return allQuestionsIds;
        }
        private void AssignOptionsToQuestion(int questionId, string[] options, string[] answers)
        {
            foreach (string option in options)
            {
                byte[] answer = new byte[] { 0 };
                if (answers.Contains(option))
                    answer[0] = 1;
                OptionAssign optionAssign = new OptionAssign
                {
                    questionId = questionId,
                    optionTitle = option,
                    answer = answer,
                };
                examController.AssignNewOption(optionAssign);
            }
        }
       
    }
}
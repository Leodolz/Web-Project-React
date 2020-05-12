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
    public class SubAreaQuestionsController
    {
        private QuestionAssignController questionAssignController = new QuestionAssignController();
        private OptionAssignController optionAssignController = new OptionAssignController();
        public void QuestionEditActions(RealExamQuestion[] newQuestions, int subAreaId)
        {
            List<RealExamQuestion> editedQuestions = QuestionUtils.GetExistingQuestions(newQuestions, questionAssignController);
            questionAssignController.EditGroupOfQuestions(editedQuestions, optionAssignController);
            List<questionAssign> oldQuestions = questionAssignController.GetAllSubAreaQuestions(subAreaId);
            List<int> deletedQuestionsIds = QuestionUtils.DeleteMissingQuestions(oldQuestions, newQuestions.ToList());
            questionAssignController.DeleteQuestions(deletedQuestionsIds);
            List<RealExamQuestion> newQuestionAssignments = QuestionUtils.FilterAndConvertQuestions(newQuestions, editedQuestions.ToArray());
            AssignNewQuestionsToSubArea(newQuestionAssignments.ToArray(), subAreaId);
        }
        public void AssignNewQuestionsToSubArea(RealExamQuestion[] questions, int subAreaId)
        {
            List<int> allQuestionsIds = AssignQuestionsToSubArea(subAreaId, questions);
            for (int i = 0; i < allQuestionsIds.Count; i++)
            {
                AssignOptionsToQuestion(allQuestionsIds[i], questions[i].options, questions[i].answer);
            }
        }
        private List<int> AssignQuestionsToSubArea(int subAreaId, RealExamQuestion[] questions)
        {
            List<int> allQuestionsIds = new List<int>();
            foreach (RealExamQuestion question in questions)
            {
                questionAssign questionSubAreaAssign = new questionAssign
                {
                    subAreaId = subAreaId,
                    title = question.title,
                    type = question.type,
                    score = question.score,
                };
                allQuestionsIds.Add(questionAssignController.AssignNewQuestion(questionSubAreaAssign));
            }
            return allQuestionsIds;
        }
        private void AssignOptionsToQuestion(int questionId, RealOption[] options, string[] answers)
        {
            foreach (RealOption option in options)
            {
                OptionAssign optionAssign = OptionUtils.OptionToOptionAssign(questionId, option, answers);
                optionAssignController.AssignNewOption(optionAssign);
            }
        }
        public RealExamQuestion[] GetAllSubAreaQuestions(int subAreaId)
        {
            List<questionAssign> allSubAreaQuestions = questionAssignController.GetAllSubAreaQuestions(subAreaId);
            return ExamUtils.GetAllQuestionElements(allSubAreaQuestions, optionAssignController);
        }
    }
}
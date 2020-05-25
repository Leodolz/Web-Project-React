using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.Repository;
using WebExamPlatformBackend.Models;
using WebExamPlatformBackend.Utils;

namespace WebExamPlatformBackend.DBControllers
{
    public class SubAreaQuestionsController
    {
        private QuestionAssignController questionAssignController = new QuestionAssignController();
        private OptionAssignController optionAssignController = new OptionAssignController();
        public void QuestionEditActions(RealExamQuestion[] newQuestions, int subAreaId)
        {
            List<RealExamQuestion> existingQuestions = QuestionUtils.GetExistingQuestions(newQuestions, questionAssignController);
            Dictionary<string, List<RealExamQuestion>> orderedEditedQuestions = GetCompromisedQuestions(existingQuestions.ToArray());
            questionAssignController.EditGroupOfQuestions(orderedEditedQuestions["unCompromised"], optionAssignController);
            List<QuestionAssign> oldQuestions = questionAssignController.GetAllSubAreaQuestions(subAreaId);
            List<int> deletedQuestionsIds = QuestionUtils.DeleteMissingQuestions(oldQuestions, newQuestions.ToList(), orderedEditedQuestions["compromised"]);
            questionAssignController.DeleteQuestions(deletedQuestionsIds);
            List<RealExamQuestion> newQuestionAssignments = QuestionUtils.FilterQuestions(newQuestions, existingQuestions.ToArray());
            newQuestionAssignments.AddRange(orderedEditedQuestions["editedCompromised"]);
            AssignNewQuestionsToSubArea(newQuestionAssignments.ToArray(), subAreaId);
        }
        private Dictionary<string, List<RealExamQuestion>> GetCompromisedQuestions(RealExamQuestion[] existingQuestions)
        {
            StudentExamQuestionController studentExamQuestionController = new StudentExamQuestionController();
            List<RealExamQuestion> compromisedQuestions = new List<RealExamQuestion>();
            List<RealExamQuestion> unCompromisedQuestions = new List<RealExamQuestion>();
            List<RealExamQuestion> compromisedEditedQuestions = new List<RealExamQuestion>();
            foreach (RealExamQuestion existingQuestion in existingQuestions)
            {
                if (studentExamQuestionController.QuestionInAnyExam(existingQuestion.questionId)
                    || questionAssignController.IsQuestionAssigned(existingQuestion.questionId))
                {
                    if (existingQuestion.edited == true)
                        compromisedEditedQuestions.Add(existingQuestion);
                    else
                        compromisedQuestions.Add(existingQuestion);
                }
                else unCompromisedQuestions.Add(existingQuestion);
            }
            return new Dictionary<string, List<RealExamQuestion>>
            {
                {"compromised",compromisedQuestions},
                {"unCompromised", unCompromisedQuestions},
                {"editedCompromised", compromisedEditedQuestions},
            };
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
                QuestionAssign questionSubAreaAssign = new QuestionAssign
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
            List<QuestionAssign> allSubAreaQuestions = questionAssignController.GetAllSubAreaQuestions(subAreaId);
            return ExamUtils.GetAllQuestionElements(allSubAreaQuestions, optionAssignController);
        }
    }
}

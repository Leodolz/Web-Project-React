using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.Repository;
using WebApplication2.DAL;
using WebApplication2.Utils;

namespace WebApplication2.DBControllers
{
   
    public class OptionAssignController
    {
        private OptionAssignRepository optionAssignRepository = new OptionAssignRepository(new Exam_DBPlatform());
        public List<OptionAssign> GetAllQuestionOptions(int questionId)
        {
            return optionAssignRepository.GetAllQuestionOptions(questionId);
        }
        public OptionAssign GetById(int id)
        {
            return optionAssignRepository.GetById(id);
        }
        public void AssignNewOption(OptionAssign assignment)
        {
            var allOptionAssignments = optionAssignRepository.GetAll();
            int lastId = allOptionAssignments[allOptionAssignments.Count() - 1].Id;
            assignment.Id = lastId + 1;
            optionAssignRepository.Insert(assignment);
            optionAssignRepository.Save();
        }
        public void EditOptionsOfQuestion(int questionId, string[] options, string[] answers) //NEEDS AN UPDATE
        {
            List<OptionAssign> oldOptions = GetAllQuestionOptions(questionId);
            List<OptionAssign> newOptions = new List<OptionAssign>();
            foreach (string option in options)
            {
                newOptions.Add(OptionUtils.OptionToOptionAssign(questionId, option, answers));
            }
            List<OptionAssign> optionsToDelete = OptionUtils.OneWayCompareOptions(oldOptions, newOptions);
            List<OptionAssign> optionsToAdd = OptionUtils.OneWayCompareOptions(newOptions, oldOptions);
            DeleteGroupOfOptions(optionsToDelete);
            AssignGroupOfOptions(optionsToAdd);
        }
        public void AssignGroupOfOptions(List<OptionAssign> assignments)
        {
            foreach(OptionAssign assignment in assignments)
            {
                AssignNewOption(assignment);
            }
        }
        public void EditOption(int subAreaId, OptionAssign newOption)
        {
            OptionAssign model = optionAssignRepository.GetById(subAreaId);
            model = newOption;
            EditOption(model);
        }
        private void EditOption(OptionAssign model)
        {
            optionAssignRepository.Update(model);
            optionAssignRepository.Save();

        }
        public void DeleteGroupOfOptions(List<OptionAssign> options)
        {
            foreach(OptionAssign option in options)
            {
                DeleteOption(option.Id);
            }
        }
        public void DeleteOption(int optionId)
        {
            OptionAssign model = optionAssignRepository.GetById(optionId);
            if (model == null)
                return;
            Delete(optionId);
        }

        private void Delete(int optionId)
        {
            optionAssignRepository.Delete(optionId);
            optionAssignRepository.Save();
        }
    }
}
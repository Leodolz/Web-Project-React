using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.Repository;
using WebApplication2.DAL;
using WebApplication2.Models;

namespace WebApplication2.DBControllers
{
   
    public class OptionAssignController
    {
        private OptionAssignRepository optionAssignRepository = new OptionAssignRepository(new Exam_DatabaseEntities());
        public List<OptionAssign> GetAllQuestionOptions(int questionId)
        {
            return optionAssignRepository.GetAllQuestionOptions(questionId);
        }
        public void AssignNewOption(OptionAssign assignment)
        {
            var allOptionAssignments = optionAssignRepository.GetAll();
            int lastId = allOptionAssignments[allOptionAssignments.Count() - 1].Id;
            assignment.Id = lastId + 1;
            optionAssignRepository.Insert(assignment);
            optionAssignRepository.Save();
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
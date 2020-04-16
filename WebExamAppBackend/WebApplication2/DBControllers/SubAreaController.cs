using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.Repository;
using WebApplication2.DAL;

namespace WebApplication2.DBControllers
{
    public class SubAreaController
    {
        private SubAreaRepository subAreaRepository = null;
        private SubAreaAssignRepository subAreaAssignRepository = null;

        public SubAreaController()
        {
            subAreaRepository = new SubAreaRepository(new Exam_DatabaseEntities());
            subAreaAssignRepository = new SubAreaAssignRepository(new Exam_DatabaseEntities());
        }
        public List<SubArea> GetAllSubAreas()
        {
            return subAreaRepository.GetAll().ToList();
        }

        public int AddSubArea(SubArea model)
        {
            var allSubAreas = subAreaRepository.GetAll();
            int lastId = allSubAreas[allSubAreas.Count() - 1].Id;
            model.Id = lastId + 1;
            subAreaRepository.Insert(model);
            subAreaRepository.Save();
            return model.Id;
        }
        public void EditSubArea(int subAreaId, SubArea newSubArea)
        {
            SubArea model = subAreaRepository.GetById(subAreaId);
            model = newSubArea;
            EditSubArea(model);
        }
        private void EditSubArea(SubArea model)
        {
            subAreaRepository.Update(model);
            subAreaRepository.Save();
            
        }
        public void DeleteSubArea(int subAreaId)
        {
            SubArea model = subAreaRepository.GetById(subAreaId);
            if (model == null)
                return;
            Delete(subAreaId);
        }

        private void Delete(int subAreaId)
        {
            subAreaRepository.Delete(subAreaId);
            subAreaRepository.Save();
        }
        public List<SubArea> GetUserSubAreas(int userId)
        {
           List<int> ids = subAreaAssignRepository.GetAllSubAreasIds(userId);
           return subAreaRepository.GetSubAreasByIds(ids);
        }
        public List<int> GetAllStudentsIds(int subAreaId)
        {
            return subAreaAssignRepository.GetAllStudentsIds(subAreaId);
        }
        public void AssignNewSubArea(SubAreaAssign assignment)
        {
            var allSubAreasAssignments = subAreaAssignRepository.GetAll();
            int lastId = allSubAreasAssignments[allSubAreasAssignments.Count() - 1].Id;
            assignment.Id = lastId + 1;
            subAreaAssignRepository.Insert(assignment);
            subAreaAssignRepository.Save();
        }
        public SubArea GetByName(string name)
        {
            return subAreaRepository.GetByName(name);
        }
        public SubArea GetById(int id)
        {
            return subAreaRepository.GetById(id);
        }
        public int GetAssignmentId(int subAreaId, int userId)
        {
            return subAreaAssignRepository.GetSubAreaAssignId(subAreaId, userId);
        }
        public void DeleteAssignment(int assignmentId)
        {
            subAreaAssignRepository.Delete(assignmentId);
            subAreaAssignRepository.Save();
        }
        
    }
}
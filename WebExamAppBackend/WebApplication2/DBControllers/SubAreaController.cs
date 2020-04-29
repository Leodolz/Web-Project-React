using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.Repository;
using WebApplication2.DAL;
using WebApplication2.Proxies;
using WebApplication2.Models;

namespace WebApplication2.DBControllers
{
    public class SubAreaController
    {
        private SubAreaRepository subAreaRepository = null;
        private SubAreaAssignRepository subAreaAssignRepository = null;

        public SubAreaController()
        {
            subAreaRepository = new SubAreaRepository(new Exam_DBPlatform3());
            subAreaAssignRepository = new SubAreaAssignRepository(new Exam_DBPlatform3());
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
            RealAreaProxy.UpdateArea(model.parentAreaId);
            List<int> subAreaAssignIds = GetAllAssignmentsOfSubArea(subAreaId);
            foreach (int subAreaAssignId in subAreaAssignIds)
            {
                DeleteAssignment(subAreaAssignId);
            }
            ExamController examController = new ExamController();
            RealExamController realExamController = new RealExamController();
            List<int> allExamIds = examController.GetAllSubAreaExamIds(subAreaId);
            foreach(int examId in allExamIds)
            {
                realExamController.DeleteExam(examId);
            }
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
        private List<int> GetAllAssignmentsOfSubArea(int subAreaId)
        {
            return subAreaAssignRepository.GetAllAssignmentsOfSub(subAreaId);
        }

        
    }
}
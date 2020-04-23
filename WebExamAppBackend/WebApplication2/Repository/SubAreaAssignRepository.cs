using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication2.DAL;

namespace WebApplication2.Repository
{
    public class SubAreaAssignRepository: GenericRepository<SubAreaAssign>
    {
        public SubAreaAssignRepository(DbContext context) : base(context)
        {

        }
        public List<int> GetAllSubAreasIds(object userId)
        {
            return table.Where(subarea=> subarea.userId == (int)userId)
               .Select(user => user.subAreaId).ToList();
            
        }

        public int GetSubAreaAssignId(int subAreaId, int userId)
        {
            return table.SingleOrDefault(assignment => assignment.subAreaId == subAreaId
                && assignment.userId == userId).Id;
        }
        public List<int> GetAllStudentsIds(int subAreaId)
        {
            return table.Where(subarea => subarea.subAreaId == subAreaId) 
                .Select(subarea => subarea.userId).ToList();
        }
        public List<int> GetAllAssignmentsOfSub(int subAreaId)
        {
            return table.Where(assignment => assignment.subAreaId == subAreaId)
                .Select(assignment => assignment.Id).ToList();
        }
    }
}
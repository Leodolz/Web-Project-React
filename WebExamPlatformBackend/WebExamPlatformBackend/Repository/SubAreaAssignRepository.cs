using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebExamPlatformBackend.DAL;

namespace WebExamPlatformBackend.Repository
{
    public class SubAreaAssignRepository : Generic.GenericRepository<SubAreaAssign>
    {
        public SubAreaAssignRepository(DbContext context) : base(context)
        {

        }
        public List<int> GetAllSubAreasIds(object userId)
        {
            return table.Where(subarea => subarea.userId == (int)userId)
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

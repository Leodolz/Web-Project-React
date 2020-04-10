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

    }
}
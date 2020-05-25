using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebExamPlatformBackend.DAL;

namespace WebExamPlatformBackend.Repository
{
    public class SubAreaRepository : Generic.GenericRepository<SubArea>
    {
        public SubAreaRepository(DbContext context) : base(context)
        {

        }
        public List<SubArea> GetSubAreasByIds(List<int> ids)
        {
            List<SubArea> subareas = new List<SubArea>();
            foreach (int id in ids)
            {
                subareas.Add(table.Find(id));
            }
            return subareas;
        }
        public SubArea GetByName(object name)
        {
            return table.SingleOrDefault(subarea => subarea.name == (string)name);
        }
        public List<SubArea> GetSubAreasByArea(int parentAreaId)
        {
            return table.Where(subarea => subarea.parentAreaId == parentAreaId)
                .Select(subarea => subarea).ToList();
        }
    }
}

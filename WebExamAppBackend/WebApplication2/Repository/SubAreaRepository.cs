using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication2.DAL;

namespace WebApplication2.Repository
{
    public class SubAreaRepository : GenericRepository<SubArea>
    {
        public SubAreaRepository(DbContext context) : base(context)
        {

        }
        public List<SubArea> GetSubAreasByIds(List<int> ids)
        {
            List<SubArea> subareas = new List<SubArea>();
            foreach(int id in ids)
            {
                subareas.Add(table.Find(id));
            }
            return subareas;
        }
    }
}
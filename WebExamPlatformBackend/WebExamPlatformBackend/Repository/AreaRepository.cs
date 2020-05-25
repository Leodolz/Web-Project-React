using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebExamPlatformBackend.DAL;

namespace WebExamPlatformBackend.Repository
{
    public class AreaRepository: Generic.GenericRepository<Area>
    {
        public AreaRepository(DbContext context) : base(context)
        {

        }
        public Area GetByAreaName(object name)
        {
            return table.SingleOrDefault(areaInTable => areaInTable.name == (string)name);
        }

    }
}

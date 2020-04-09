using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication2.DAL;

namespace WebApplication2.Repository
{
    public class AreaRepository : GenericRepository<Area>
    {
        public AreaRepository(DbContext context) : base(context)
        {

        }
       // TODO: MAKE MORE INDIVIDYAK ROUTINES
    }
}
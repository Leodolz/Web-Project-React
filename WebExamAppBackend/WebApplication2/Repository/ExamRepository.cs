using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Web;
using WebApplication2.DAL;

namespace WebApplication2.Repository
{
    public class ExamRepository: GenericRepository<Exam>
    {
        public ExamRepository(DbContext context): base(context)
        {

        }
        
    }
}
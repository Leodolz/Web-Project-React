using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.Models;

namespace WebApplication2.Repository
{
    public class OptionAssignRepository : GenericRepository<OptionAssign>
    {
        public OptionAssignRepository(DbContext context) : base(context)
        {

        }
        public List<OptionAssign> GetAllQuestionOptions (object questionId)
        {
            return table.Where(option => option.questionId == (int)questionId)
                .Select(option => option).ToList();
        }
    }
}
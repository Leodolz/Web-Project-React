using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebExamPlatformBackend.DAL;


namespace WebExamPlatformBackend.Repository
{
    public class QuestionAssignRepository : Generic.GenericRepository<QuestionAssign>
    {
        public QuestionAssignRepository(DbContext context) : base(context)
        {

        }

        public List<QuestionAssign> GetAllQuestionAssignments(object subAreaId)
        {
            return table.Where(assigment => assigment.subAreaId == (int)subAreaId)
                .Select(assignment => assignment).ToList();
        }
    }
}

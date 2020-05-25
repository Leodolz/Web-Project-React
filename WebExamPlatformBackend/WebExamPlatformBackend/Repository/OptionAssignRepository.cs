using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebExamPlatformBackend.DAL;

namespace WebExamPlatformBackend.Repository
{
    public class OptionAssignRepository : Generic.GenericRepository<OptionAssign>
    {
        public OptionAssignRepository(DbContext context) : base(context)
        {

        }
        public List<OptionAssign> GetAllQuestionOptions(object questionId)
        {
            return table.Where(option => option.questionId == (int)questionId)
                .Select(option => option).ToList();
        }
        public OptionAssign GetByTitleAndQuestionId(string title, int questionId)
        {
            return table.FirstOrDefault(option => option.optionTitle == title
                && option.questionId == questionId);
        }
    }
}

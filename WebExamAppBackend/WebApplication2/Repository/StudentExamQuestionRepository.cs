using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using WebApplication2.DAL;

namespace WebApplication2.Repository
{
    public class StudentExamQuestionRepository : GenericRepository<StudentQuestionTable>
    {
        public StudentExamQuestionRepository(DbContext context) : base(context)
        {

        }
        public StudentQuestionTable GetByModelQuestionId(int id)
        {
            return table.FirstOrDefault(question => question.questionId == id);
        }
    }
}
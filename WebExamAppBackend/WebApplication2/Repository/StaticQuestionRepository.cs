using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
namespace WebApplication2.Repository
{
    public class StaticQuestionRepository: GenericRepository<StaticQuestionAssign>
    {
        public StaticQuestionRepository(DbContext context):base(context)
        {

        }
        
       public List<int> GetAllExamQuestionsIds(object examId)
       {
           return table.Where(assigment => assigment.examId == (int)examId)
               .Select(assignment => assignment.questionId).ToList();
       }
    }
}
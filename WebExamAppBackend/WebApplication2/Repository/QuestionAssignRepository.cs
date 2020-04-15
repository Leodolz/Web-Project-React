using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.Models;

namespace WebApplication2.Repository
{
    public class QuestionAssignRepository: GenericRepository<questionAssign>
    {
        public QuestionAssignRepository(DbContext context):base(context)
        {

        }
        public List<questionAssign> GetAllExamQuestions(object examId)
        {
            return table.Where(assigment => assigment.examId == (int)examId)
                .Select(assignment => assignment).ToList();
        }
    }
}
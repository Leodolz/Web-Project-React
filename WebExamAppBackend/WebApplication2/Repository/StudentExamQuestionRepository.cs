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
        public List<int> GetAllQuestionsInExam(int studentExamId)
        {
            return table.Where(stQuestion => stQuestion.studentExamId == studentExamId)
                .Select(stQuestion => stQuestion.questionId).ToList();
        }
        public List<int> GetAllStudentQuestionIdsInExam(int studentExamId)
        {
            return table.Where(stQuestion => stQuestion.studentExamId == studentExamId)
                .Select(stQuestion => stQuestion.Id).ToList();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebExamPlatformBackend.DAL;

namespace WebExamPlatformBackend.Repository
{
    public class StudentExamQuestionRepository : Generic.GenericRepository<StudentQuestionTable>
    {
        public StudentExamQuestionRepository(DbContext context) : base(context)
        {

        }
        public StudentQuestionTable GetByModelQuestionIdAndStudentId(int id, int studentExamId)
        {
            return table.FirstOrDefault(question => question.questionId == id && question.studentExamId == studentExamId);
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
        public bool QuestionInAnyExam(int questionId)
        {
            return table.Where(stQuestion => stQuestion.questionId == questionId)
                .Select(question => question.Id).ToArray().Length > 0;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebExamPlatformBackend.DAL;

namespace WebExamPlatformBackend.Repository
{
    public class StudentExamRepository : Generic.GenericRepository<StudentExam>
    {
        public StudentExamRepository(DbContext context) : base(context)
        {

        }
        public IEnumerable<StudentExam> GetAllStudentExams(int id)
        {
            return table.Where(studentExam => studentExam.studentId == id)
                .Select(exam => exam);
        }
        public IEnumerable<int> GetAllStudentExamIds(int id)
        {
            return table.Where(studentExam => studentExam.studentId == id)
                .Select(exam => exam.examId);
        }
        public IEnumerable<int> GetAllStudntExamsFromModel(int modelId)
        {
            return table.Where(studentExam => studentExam.examId == modelId)
                .Select(studentExam => studentExam.Id);
        }
    }
}

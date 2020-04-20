﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using WebApplication2.DAL;

namespace WebApplication2.Repository
{
    public class StudentExamRepository : GenericRepository<StudentExam>
    {
        public StudentExamRepository(DbContext context): base(context)
        {

        }
        public IEnumerable<StudentExam> GetAllStudentExams(int id)
        {
            return table.Where(studentExam => studentExam.studentId == id)
                .Select(exam => exam);
        }
    }
}
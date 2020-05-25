﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebExamPlatformBackend.DAL;

namespace WebExamPlatformBackend.Repository
{
    public class StaticQuestionRepository : Generic.GenericRepository<StaticQuestionAssign>
    {
        public StaticQuestionRepository(DbContext context) : base(context)
        {

        }

        public List<int> GetAllExamQuestions(object examId)
        {
            return table.Where(assigment => assigment.examId == (int)examId)
                .Select(assignment => assignment.questionId).ToList();
        }
        public List<StaticQuestionAssign> GetAllStaticExamQuestions(object examId)
        {
            return table.Where(assigment => assigment.examId == (int)examId)
                .Select(assignment => assignment).ToList();
        }
        public StaticQuestionAssign GetStaticInExam(int examId, int questionId)
        {
            return table.FirstOrDefault(assignment => assignment.examId == examId &&
            assignment.questionId == questionId);
        }
        public bool IsQuestionAssigned(int questionId)
        {
            return table.Where(assignment => assignment.questionId == questionId)
                .Select(assignment => assignment.Id).ToArray().Length > 0;
        }
    }
}
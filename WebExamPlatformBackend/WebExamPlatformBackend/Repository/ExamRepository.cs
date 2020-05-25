﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebExamPlatformBackend.DAL;

namespace WebExamPlatformBackend.Repository
{
    public class ExamRepository: Generic.GenericRepository<Exam>
    {
        public ExamRepository(DbContext context) : base(context)
        {

        }
        public List<Exam> GetAllFutureBySubArea(int[] subAreaIds)
        {
            return table.Where(exam => subAreaIds.Contains(exam.subAreaId) && exam.fromDate > DateTime.Now)
                .Select(exam => exam).ToList();
        }
        public List<Exam> GetAllPresentBySubArea(int[] subAreaIds, List<int> takenIds)
        {
            return table.Where(exam => subAreaIds.Contains(exam.subAreaId) && exam.fromDate <= DateTime.Now
                && exam.untilDate >= DateTime.Now && !(takenIds.Contains(exam.Id)))
                .Select(exam => exam).ToList();
        }
        public List<int> GetAllSubAreaExams(int subAreaId)
        {
            return table.Where(exam => exam.subAreaId == subAreaId)
                .Select(exam => exam.Id).ToList();
        }
        public List<Exam> GetAllPastBySubArea(int[] subAreaIds)
        {
            return table.Where(exam => subAreaIds.Contains(exam.subAreaId) && exam.fromDate < DateTime.Now)
                .Select(exam => exam).ToList();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class RealExam
    {
        public int Id { get; set; }
        public string title { get; set; }
        public string fromDate { get; set; }
        public int subAreaId { get; set; }
        public string subarea { get; set; }
        public string area { get; set; }
        public int areaId { get; set; }
        public int numberQuestions { get; set; }
        public string untilDate { get; set; }
        public RealExamQuestion [] examElements { get; set; }
        public int studentTotalScore { get; set; }
        public int studentId { get; set; }
        public bool staticQuestions { get; set; }
        public RealExam()
        {

        }
        public RealExam(RealExam exam)
        {
            area = exam.area;
            areaId = exam.areaId;
            Id = exam.Id;
            title = exam.title;
            fromDate = exam.fromDate;
            subAreaId = exam.subAreaId;
            subarea = exam.subarea;
            numberQuestions = exam.numberQuestions;
            untilDate = exam.untilDate;
            List<RealExamQuestion> newExamQuestions = new List<RealExamQuestion>();
            foreach (RealExamQuestion realExamQuestion in exam.examElements)
            {
                newExamQuestions.Add(new RealExamQuestion(realExamQuestion));
            }
            examElements = newExamQuestions.ToArray();
            studentTotalScore = exam.studentTotalScore;
            studentId = exam.studentId;
            staticQuestions = exam.staticQuestions;
        }
    }
}
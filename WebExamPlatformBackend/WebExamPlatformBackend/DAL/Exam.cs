using System;
using System.Collections.Generic;

namespace WebExamPlatformBackend.DAL
{
    public partial class Exam
    {
        public int Id { get; set; }
        public string title { get; set; }
        public DateTime fromDate { get; set; }
        public DateTime untilDate { get; set; }
        public int subAreaId { get; set; }
        public int numberQuestions { get; set; }
        public bool staticQuestions { get; set; }
    }
}

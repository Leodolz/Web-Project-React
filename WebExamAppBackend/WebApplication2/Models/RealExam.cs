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
        public int totalScore { get; set; }
        public string untilDate { get; set; }
        public RealExamQuestion [] examElements { get; set; }
        public int studentTotalScore { get; set; }

    }
}
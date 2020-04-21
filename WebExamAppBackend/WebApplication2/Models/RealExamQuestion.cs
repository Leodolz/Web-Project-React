using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class RealExamQuestion
    {
        public string title { get; set; }
        public string type { get; set; }
        public string[] options { get; set; } 
        public string[] answer { get; set; }
        public bool multiple { get; set; }
        public string[] studentAnswer { get; set; }
        public int studentScore { get; set; }
        public int score { get; set; }
        public int questionId { get; set; }
        public int answerCount { get; set; }
    }
}
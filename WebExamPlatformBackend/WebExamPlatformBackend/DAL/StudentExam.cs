using System;
using System.Collections.Generic;

namespace WebExamPlatformBackend.DAL
{
    public partial class StudentExam
    {
        public int Id { get; set; }
        public int examId { get; set; }
        public int score { get; set; }
        public int studentId { get; set; }
    }
}

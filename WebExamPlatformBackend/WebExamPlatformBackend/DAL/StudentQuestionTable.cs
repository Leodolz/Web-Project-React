using System;
using System.Collections.Generic;

namespace WebExamPlatformBackend.DAL
{
    public partial class StudentQuestionTable
    {
        public int Id { get; set; }
        public int studentExamId { get; set; }
        public int questionId { get; set; }
        public string studentAnswerIds { get; set; }
        public int score { get; set; }
    }
}

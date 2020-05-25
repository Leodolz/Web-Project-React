using System;
using System.Collections.Generic;

namespace WebExamPlatformBackend.DAL
{
    public partial class StaticQuestionAssign
    {
        public int Id { get; set; }
        public int examId { get; set; }
        public int questionId { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace WebExamPlatformBackend.DAL
{
    public partial class QuestionAssign
    {
        public int Id { get; set; }
        public int subAreaId { get; set; }
        public string title { get; set; }
        public string type { get; set; }
        public int score { get; set; }
    }
}

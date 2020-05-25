using System;
using System.Collections.Generic;

namespace WebExamPlatformBackend.DAL
{
    public partial class OptionAssign
    {
        public int Id { get; set; }
        public int questionId { get; set; }
        public string optionTitle { get; set; }
        public bool answer { get; set; }
    }
}

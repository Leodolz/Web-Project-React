using System;
using System.Collections.Generic;

namespace WebExamPlatformBackend.DAL
{
    public partial class SubAreaAssign
    {
        public int Id { get; set; }
        public int userId { get; set; }
        public DateTime created { get; set; }
        public int subAreaId { get; set; }
    }
}

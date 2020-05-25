using System;
using System.Collections.Generic;

namespace WebExamPlatformBackend.DAL
{
    public partial class Area
    {
        public int Id { get; set; }
        public string name { get; set; }
        public DateTime created { get; set; }
    }
}

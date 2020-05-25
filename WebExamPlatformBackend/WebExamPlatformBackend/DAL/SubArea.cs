using System;
using System.Collections.Generic;

namespace WebExamPlatformBackend.DAL
{
    public partial class SubArea
    {
        public int Id { get; set; }
        public string name { get; set; }
        public DateTime created { get; set; }
        public int parentAreaId { get; set; }
    }
}

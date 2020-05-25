using System;
using System.Collections.Generic;

namespace WebExamPlatformBackend.DAL
{
    public partial class Image
    {
        public int Id { get; set; }
        public string imgContext { get; set; }
        public byte[] imgData { get; set; }
        public int contextId { get; set; }
    }
}

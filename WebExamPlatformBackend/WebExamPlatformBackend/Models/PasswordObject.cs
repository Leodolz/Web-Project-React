using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebExamPlatformBackend.Models
{
    public class PasswordObject
    {
        public int userId { get; set; }
        public string newPassword { get; set; }
    }
}

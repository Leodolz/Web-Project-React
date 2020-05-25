using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;

namespace WebExamPlatformBackend.Utils
{
    public static class StringUtils
    {
        public static string StringToSha(string value)
        {
            using (SHA256 hash = SHA256.Create())
            {
                return string.Concat(hash
                  .ComputeHash(Encoding.UTF8.GetBytes(value))
                  .Select(item => item.ToString("x2")));
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebExamPlatformBackend
{
    public static class ConnectionString
    {
        private static string connectionString = "metadata=res://*/DAL.Model1.csdl|res://*/DAL.Model1.ssdl|res://*/DAL.Model1.msl;" +
            "provider=System.Data.SqlClient;" +
            "provider connection string='data source=(LocalDB)\\MSSQLLocalDB;" +
            "attachdbfilename=C:\\Users\\leandro.hurtado\\Documents\\ExamPlatformDB.mdf;" +
            "integrated security=True;" +
            "multipleactiveresultsets=True;" +
            "connect timeout=30;" +
            "application name=EntityFramework'";
        public static string GetConnectionString()
        {
            return connectionString;
        }
    }
}

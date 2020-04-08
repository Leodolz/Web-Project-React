using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication2.DAL;

namespace WebApplication2.Proxies
{
    interface IUserProxy
    {
        User GetUser(string username);
    }
}

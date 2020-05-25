using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace WebExamPlatformBackend.Repository.Generic
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected DbContext context = null;
        protected DbSet<T> table = null;
        public GenericRepository(DbContext context)
        {
            this.context = context;
            table = context.Set<T>();
        }
        public void Delete(object id)
        {
            T existing = table.Find(id);
            table.Remove(existing);

        }

        public IList<T> GetAll()
        {
            return table.ToList();
        }
        public T GetById(object id)
        {
            return table.Find(id);
        }

        public void Insert(T obj)
        {
            table.Add(obj);
        }

        public void Save()
        {
           context.SaveChanges();
        }

        public void Update(T obj)
        {
            table.Attach(obj);
            Console.WriteLine("This is at: " + obj);
            context.Entry(obj).State = EntityState.Modified;
        }
    }
}

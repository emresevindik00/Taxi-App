using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;


namespace DataAccess.Concrete
{
    public class UserContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer
                (@"Server=(localdb)\mssqllocaldb;Database=User;Trusted_Connection=true");
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserDetail> UsersTaxi { get; set; }
    }
}

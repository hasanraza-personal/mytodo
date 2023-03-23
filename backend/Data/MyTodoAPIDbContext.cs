using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class MyTodoAPIDbContext : DbContext
    {
        public MyTodoAPIDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<TodoList> TodoList { get; set; }
    }
}

using ErpOperatation.Models;
using Microsoft.EntityFrameworkCore;

namespace ErpOperatation.Repository
{
    public class APIDbContext : DbContext
    {
        public APIDbContext(DbContextOptions<APIDbContext> options) : base(options)
        {

        }

        public DbSet<DepartmentModel> Departments { get; set; }
        public DbSet<UserModel> Users { get; set; } 
        public DbSet<SO2_OperationModel> SO2_Operation { get; set; }
        //public DbSet<EmployeeAngular> EmployeeAngulars { get; set; }

    }
}

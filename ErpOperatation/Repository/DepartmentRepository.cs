using ErpOperatation.Models;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;


namespace ErpOperatation.Repository
{
    public interface IDepartmentRepository
    {
        Task<IEnumerable<DepartmentModel>> GetDepartment();
        Task<DepartmentModel> GetDepartmentByID(int ID);
        Task<DepartmentModel> InsertDepartment(DepartmentModel objDepartment);
        Task<DepartmentModel> UpdateDepartment(DepartmentModel objDepartment);
        bool DeleteDepartment(int ID);
    }
    public class DepartmentRepository : IDepartmentRepository
    {

        private readonly APIDbContext _appDBContext;

        public DepartmentRepository(APIDbContext context)
        {
            _appDBContext = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<DepartmentModel>> GetDepartment()
        {
            return await _appDBContext.Departments.ToListAsync();
        }

        public async Task<DepartmentModel> GetDepartmentByID(int ID)
        {
            return await _appDBContext.Departments.FindAsync(ID);
        }

        public async Task<DepartmentModel> InsertDepartment(DepartmentModel objDepartment)
        {
            _appDBContext.Departments.Add(objDepartment);
            await _appDBContext.SaveChangesAsync();
            return objDepartment;

        }

        public async Task<DepartmentModel> UpdateDepartment(DepartmentModel objDepartment)
        {
            _appDBContext.Entry(objDepartment).State = EntityState.Modified;
            await _appDBContext.SaveChangesAsync();
            return objDepartment;
        }

        public bool DeleteDepartment(int ID)
        {
            bool result = false;
            var department = _appDBContext.Departments.Find(ID);
            if (department != null)
            {
                _appDBContext.Entry(department).State = EntityState.Deleted;
                _appDBContext.SaveChanges();
                result = true;
            }
            else
            {
                result = false;
            }
            return result;
        }
    }
}

using ErpOperatation.Models;
using Microsoft.EntityFrameworkCore;

namespace ErpOperatation.Repository
{
    public interface ISO2OperationRepository
    {
        Task<IEnumerable<SO2_OperationModel>> GetSO2Operation();
        Task<SO2_OperationModel> GetSO2OperationByID(int ID);
        Task<SO2_OperationModel> InsertSO2Operation(SO2_OperationModel objSO2Operation);
        Task<SO2_OperationModel> UpdateSO2Operation(SO2_OperationModel objSO2Operation);
        bool DeleteSO2Operation(int ID);
    }
    public class SO2OperationRepository : ISO2OperationRepository
    {

        private readonly APIDbContext _appDBContext;

        public SO2OperationRepository(APIDbContext context)
        {
            _appDBContext = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<SO2_OperationModel>> GetSO2Operation()
        {
            return await _appDBContext.SO2_Operation.ToListAsync();
        }

        public async Task<SO2_OperationModel> GetSO2OperationByID(int ID)
        {
            return await _appDBContext.SO2_Operation.FindAsync(ID);
        }

        public async Task<SO2_OperationModel> InsertSO2Operation(SO2_OperationModel objSO2Operation)
        {
            _appDBContext.SO2_Operation.Add(objSO2Operation);
            await _appDBContext.SaveChangesAsync();
            return objSO2Operation;

        }

        public async Task<SO2_OperationModel> UpdateSO2Operation(SO2_OperationModel objSO2Operation)
        {
            _appDBContext.Entry(objSO2Operation).State = EntityState.Modified;
            await _appDBContext.SaveChangesAsync();
            return objSO2Operation;

        }

        public bool DeleteSO2Operation(int ID)
        {
            bool result = false;
            var department = _appDBContext.SO2_Operation.Find(ID);
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

using ErpOperatation.Repository;
using ErpOperatation.Models;
using Microsoft.EntityFrameworkCore;

namespace ErpOperatation.Services
{
    public class SO2OperationService
    {
        private readonly ISO2OperationRepository _so2OperationRepository;
        public SO2OperationService(ISO2OperationRepository so2OperationRepository)
        {
            _so2OperationRepository = so2OperationRepository ?? throw new ArgumentNullException(nameof(so2OperationRepository));
        }

        public async Task<IEnumerable<SO2_OperationModel>> GetSO2Operation()
        {
            return await _so2OperationRepository.GetSO2Operation();
        }

        public async Task<SO2_OperationModel> GetSO2OperationByID(int id)
        {
            return await _so2OperationRepository.GetSO2OperationByID(id);
        }

        public async Task<SO2_OperationModel> AddSO2Operation(SO2_OperationModel objSO2Operation)
        {
            return await _so2OperationRepository.InsertSO2Operation(objSO2Operation);
        }

        public async Task<SO2_OperationModel> UpdateSO2Operation(SO2_OperationModel objSO2Operation)
        {
            return await _so2OperationRepository.UpdateSO2Operation(objSO2Operation);
        }

        public bool DeleteSO2Operation(int id)
        {
            return _so2OperationRepository.DeleteSO2Operation(id);
        }

    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ErpOperatation.Models
{
    [Table("SO2_Operation")]
    public class SO2_OperationModel
    {
        #region "Model"
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "First DaySO2Hrs is required.")]
        public int DaySO2Hrs { get; set; }

        [Required(ErrorMessage = "DaySO2Water is required.")]
        public int DaySO2Water { get; set; }

        [Required(ErrorMessage = "CumSO2Hrs is required.")]
        public int CumSO2Hrs { get; set; }

        [Required(ErrorMessage = "CumSO2Water is required.")]
        public int CumSO2Water { get; set; }

        [Required(ErrorMessage = "Remarks is required.")]
        public string Remarks { get; set; }
        #endregion
    }
}

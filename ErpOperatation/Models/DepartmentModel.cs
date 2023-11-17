using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ErpOperatation.Models
{
    [Table("Department")]

    public class DepartmentModel
    {
        [Key]
        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; }
    }

}

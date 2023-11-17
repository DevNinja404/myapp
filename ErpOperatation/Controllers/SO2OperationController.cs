using ErpOperatation.Models;
using ErpOperatation.Repository;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ErpOperatation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SO2OperationController : ControllerBase
    {
        private readonly ISO2OperationRepository _so2operation;

        public SO2OperationController(ISO2OperationRepository so2operation)
        {
            _so2operation = so2operation ?? throw new ArgumentNullException(nameof(_so2operation));
        }
        [HttpGet]
        [Route("GetSO2Operation")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _so2operation.GetSO2Operation());
        }

        [HttpGet]
        [Route("GetSO2OperationByID/{Id}")]
        public async Task<IActionResult> GetSO2OperationByID(int Id)
        {
            return Ok(await _so2operation.GetSO2OperationByID(Id));
        }

        [HttpPost]
        [Route("AddSO2Operation")]
        public async Task<IActionResult> Post(SO2_OperationModel so2operation)
        {
            var result = await _so2operation.InsertSO2Operation(so2operation);
            if (result.Id == 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
            }
            return new JsonResult("Added Successfully");
        }

        //[HttpPut]
        //[Route("UpdateSO2Operation")]
        //public async Task<IActionResult> Put(SO2_OperationModel so2operation)
        //{
        //    await _so2operation.UpdateSO2Operation(so2operation);
        //    return new JsonResult("Updated Successfully");
        //}
        [HttpPut]
        [Route("UpdateSO2Operation")]
        public async Task<IActionResult> UpdateSO2Operation([FromBody] SO2_OperationModel so2operation)
        {
            try
            {
                var updatedSO2Operation = await _so2operation.UpdateSO2Operation(so2operation);

                if (updatedSO2Operation != null)
                {
                   // return Ok(updatedSO2Operation); // Return the updated object
                    return new JsonResult("Updated Successfully");
                }
                else
                {
                    return BadRequest("Update failed");
                }
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                // You might want to return a more detailed error message
                return StatusCode(500, "Internal server error");
            }
        }



        [HttpDelete]
        //[HttpDelete("{id}")]
        [Route("DeleteSO2Operation/{Id}")]
        public JsonResult Delete(int id)
        {
            _so2operation.DeleteSO2Operation(id);
            return new JsonResult("Deleted Successfully");
        }
    }
}

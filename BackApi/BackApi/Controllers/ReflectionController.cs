using Microsoft.AspNetCore.Mvc;
using APIServiceFactory.Reflection;

namespace BackApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReflectionController : ControllerBase
    {
        private readonly IImporterScanner _importerScanner;

        public ReflectionController(IImporterScanner importerScanner)
        {
            _importerScanner = importerScanner;
        }

        [HttpGet("importers")]
        public IActionResult GetImporters()
        {
            try
            {
                var assemblies = _importerScanner.FindImporterAssemblies();
                return Ok(assemblies);
            }
            catch
            {
                return Problem("An unexpected error occurred while processing the request.");
            }
        }
    }
}

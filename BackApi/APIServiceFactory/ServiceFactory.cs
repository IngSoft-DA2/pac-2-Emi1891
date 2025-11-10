using APIServiceFactory.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace APIServiceFactory
{
    public static class ServiceFactory
    {
        public static void AddServices(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<IImporterScanner, ImporterScanner>();
        }
    }
}

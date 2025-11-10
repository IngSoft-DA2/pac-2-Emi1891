
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using IImporter;

namespace APIServiceFactory.Reflection;

public class ImporterScanner : IImporterScanner
{
    private readonly string _reflectionDirectory = Path.Combine(Directory.GetCurrentDirectory(), "reflection");

    public IReadOnlyList<string> FindImporterAssemblies()
    {
        if (!Directory.Exists(_reflectionDirectory))
        {
            return Array.Empty<string>();
        }

        var result = new List<string>();

        foreach (var dllPath in Directory.GetFiles(_reflectionDirectory, "*.dll"))
        {
            var assemblyName = Path.GetFileNameWithoutExtension(dllPath);

            try
            {
                var assembly = Assembly.LoadFrom(dllPath);
                var matchesImporter = assembly
                    .GetExportedTypes()
                    .Any(type => type.IsClass && !type.IsAbstract && typeof(ImporterInterface).IsAssignableFrom(type));

                if (matchesImporter)
                {
                    result.Add(assemblyName);
                }
            }
            catch {}
        }

        return result;
    }
}

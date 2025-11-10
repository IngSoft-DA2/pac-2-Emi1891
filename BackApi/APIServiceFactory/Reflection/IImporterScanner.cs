namespace APIServiceFactory.Reflection;

public interface IImporterScanner
{
    IReadOnlyList<string> FindImporterAssemblies();
}


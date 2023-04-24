using NUnit.Framework;
using System.Text.Json;

namespace backend_tests.Utils;

public class AssertByJson
{
    public static void AreEqual(object? expected, object? actual)
    {
        var expectedJson = JsonSerializer.Serialize(expected);
        var actualJson = JsonSerializer.Serialize(actual);
        Assert.That(actualJson, Is.EqualTo(expectedJson));
    }
}
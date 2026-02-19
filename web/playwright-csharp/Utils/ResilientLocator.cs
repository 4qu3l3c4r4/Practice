using Microsoft.Playwright;

namespace Utils;

/// <summary>
/// Self-healing locator — tries data-test-id → role → text → CSS.
/// </summary>
public class ResilientLocator
{
    private readonly IPage _page;
    private readonly float _timeout;

    public ResilientLocator(IPage page, float timeout = 5000)
    {
        _page = page;
        _timeout = timeout;
    }

    public async Task<ILocator> FindAsync(string? testId = null, AriaRole? role = null, string? roleName = null, string? text = null, string? css = null)
    {
        float per = _timeout / 4;

        if (testId != null)
        {
            var loc = _page.Locator($"[data-test-id=\"{testId}\"]").First;
            if (await loc.IsVisibleAsync(new() { Timeout = per }).ContinueWith(t => !t.IsFaulted && t.Result)) return loc;
        }
        if (role != null)
        {
            var loc = _page.GetByRole(role.Value, new() { Name = roleName }).First;
            if (await loc.IsVisibleAsync(new() { Timeout = per }).ContinueWith(t => !t.IsFaulted && t.Result)) return loc;
        }
        if (text != null)
        {
            var loc = _page.GetByText(text).First;
            if (await loc.IsVisibleAsync(new() { Timeout = per }).ContinueWith(t => !t.IsFaulted && t.Result)) return loc;
        }
        if (css != null)
        {
            return _page.Locator(css).First;
        }

        return _page.Locator($"[data-test-id=\"{testId}\"]");
    }
}

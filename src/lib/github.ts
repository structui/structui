export async function getGitHubStarCount(): Promise<number | null> {
  try {
    const response = await fetch("https://api.github.com/repos/structui/structui", {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { stargazers_count?: number };

    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

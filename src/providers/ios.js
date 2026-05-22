export const getIosVersion = async (bundleId, country) => {
  // Adds a random number to the end of the URL to prevent caching
  const url = `https://itunes.apple.com/lookup?bundleId=${bundleId}&country=${country}&_=${new Date().valueOf()}`;

  const response = await fetch(url);

  const data = await response.json();

  if (!data?.results) {
    throw new Error("Unknown error connecting to iTunes.");
  }
  if (!data.results.length) {
    throw new Error("App for this bundle ID not found.");
  }

  const res = data.results[0];
  return {
    version: res.version || null,
    releasedAt: res.releaseDate || "",
    updatedAt: res.currentVersionReleaseDate || "",
    notes: res.releaseNotes || "",
    url: res.trackViewUrl || res.artistViewUrl || res.sellerUrl || "",
    country: country || "",
    bundleId: bundleId || "",
    lastChecked: new Date().toISOString(),
    appIcon: res.artworkUrl512 || res.artworkUrl100 || "",
    appName: res.trackName || "",
    description: res.description || "",
  };
};

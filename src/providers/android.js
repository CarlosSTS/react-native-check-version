export const getAndroidVersion = async (bundleId, country) => {
  const url = `https://play.google.com/store/apps/details?id=${bundleId}&hl=${country}`;
  let res;
  try {
    res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36",
        'sec-fetch-site': 'same-origin'
      }
    });
  } catch (e) {
    throw e;
  }

  if (!res.ok) {

    if (res.status === 404) {
      throw new Error(
        `App with bundle ID "${bundleId}" not found in Google Play.`
      );
    }
    throw res.statusText
  }

  const text = await res.text();
  const version = text.match(/\[\[\["([0-9A-Za-z.\-_]+)"\]\]/)?.[1] ||
    text.match(/]],"(\d+\.\d+\.\d+\.\d+)",null,\[\[\[/)?.[1];
  const notes = text.match(/itemprop="description">(.*?)<\/div>/)?.[1];
  const updatedAt = text.match(/<div class="xg1aie">(.*?)<\/div>/)?.[1];
  const releasedAt = text.match(/\["([^"]+)",\[\d+,\d+\]\]/)?.[1];
  const appIcon = text.match(/<meta property="og:image" content="([^"]+)"/,)?.[1];
  const appName = text.match(/<title.*?>(.*?) (–|-)/)?.[1];
  const description = text.match(/<meta name="description" property="og:description" content="([^"]+)"/,)?.[1];

  return {
    version: version || null,
    releasedAt: releasedAt || "",
    updatedAt: updatedAt || "",
    notes: notes || "",
    url: `https://play.google.com/store/apps/details?id=${bundleId}&hl=${country}`,
    country: country || "",
    bundleId: bundleId || "",
    lastChecked: new Date().toISOString(),
    appIcon: appIcon || "",
    appName: appName || "",
    description: description || "",
  };
};

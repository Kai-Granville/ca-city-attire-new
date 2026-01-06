const AWIN_BASE_URL = "https://api.awin.com/publishers";

export async function fetchAwinProducts({ limit = 50, page = 1, country = "GB" }) {
  if (!process.env.AWIN_API_TOKEN || !process.env.AWIN_PUBLISHER_ID) {
    throw new Error("AWIN API token or publisher ID not set");
  }

  const publisherId = process.env.AWIN_PUBLISHER_ID;

  const url = `${AWIN_BASE_URL}/${publisherId}/products` +
    `?results=${limit}&page=${page}&country=${country}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.AWIN_API_TOKEN}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AWIN API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.products || data.results || [];
}

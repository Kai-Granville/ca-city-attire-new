const AWIN_BASE_URL = "https://api.awin.com";

export async function fetchAwinProducts({ q, limit = 10 }) {
  const params = new URLSearchParams({
    query: q || "",
    results: limit,
  });

  const res = await fetch(`${AWIN_BASE_URL}/products?${params}`, {
    headers: {
      Authorization: `Bearer ${process.env.AWIN_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("AWIN API error");
  }

  const data = await res.json();
  return data.products || [];
}

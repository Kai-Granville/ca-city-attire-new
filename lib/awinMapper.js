export function mapAwinToProduct(awin) {
  if (!awin) return null;

  const awinId = awin.product_id || awin.id;
  if (!awinId) return null;

  return {
    id: `awin_${awinId}`,
    title: awin.product_name || awin.name || "Untitled product",
    price: parseFloat(awin.search_price?.amount || awin.price || 0),
    image: awin.image_url || awin.image,
    merchant: awin.advertiser_name || awin.merchant_name || "Unknown",
    affiliate_link: awin.aw_deep_link || awin.deep_link,
    category: awin.category_name || "all",
    color: null,
    last_updated: new Date().toISOString(),
    // ❌ DO NOT SET clicks here
  };
}

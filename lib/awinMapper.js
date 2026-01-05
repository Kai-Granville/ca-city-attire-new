// Map AWIN product to your Supabase schema
export function mapAwinToProduct(awin) {
  return {
    id: `awin_${awin.id}`,               // unique ID
    title: awin.product_name,
    price: awin.search_price?.amount || 0,
    image: awin.image_url,
    merchant: awin.advertiser_name,
    affiliate_link: awin.aw_deep_link,
    category: awin.category_name || "all",
    color: null,
    last_updated: new Date().toISOString(),
    clicks: 0,
  };
}

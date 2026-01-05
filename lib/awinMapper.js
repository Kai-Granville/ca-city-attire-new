export function mapAwinToProduct(awin) {
  return {
    id: `awin_${awin.id}`,              // safe temp ID
    title: awin.product_name,
    price: awin.search_price?.amount,
    image: awin.image_url,
    merchant: awin.advertiser_name,
    affiliate_link: awin.aw_deep_link,
    category: awin.category_name || "all",
    color: null,
    last_updated: new Date().toISOString(),
    clicks: 0,
  };
}

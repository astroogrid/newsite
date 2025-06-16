import { useMemo } from 'react';
import { Product, products } from '@/data/products';
import { CartItem } from '@/contexts/CartContext';

// Usage example:
// const recs = useProductRecommendations(product);
// const recsFromCart = useProductRecommendations(cartItems);

export function getRecommendedProducts(
  source: Product | CartItem[],
  count = 4,
  allProducts: Product[] = products,
): Product[] {
  const targetTags: string[] = [];
  const excludeIds: number[] = [];

  if (Array.isArray(source)) {
    // cart case
    for (const item of source) {
      const prod = allProducts.find((p) => p.id === item.id);
      if (prod) {
        excludeIds.push(prod.id);
        if (prod.tags) targetTags.push(...prod.tags);
      }
    }
  } else {
    excludeIds.push(source.id);
    if (source.tags) targetTags.push(...source.tags);
  }

  const uniqueTags = Array.from(new Set(targetTags));

  const scored = allProducts
    .filter((p) => !excludeIds.includes(p.id))
    .map((p) => {
      const score = uniqueTags.reduce(
        (acc, tag) => (p.tags?.includes(tag) ? acc + 1 : acc),
        0,
      );
      return { product: p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((r) => r.product);
}

export function useProductRecommendations(
  source: Product | CartItem[] | undefined,
  count = 4,
): Product[] {
  return useMemo(() => {
    if (!source) return [];
    return getRecommendedProducts(source, count);
  }, [source, count]);
}

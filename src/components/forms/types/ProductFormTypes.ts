
export interface ProductFormData {
  name: string;
  url: string;
  description: string;
  specifications: string;
  price: string;
  discountPrice: string;
  relatedLinks: { value: string }[];
  mayYouLike: { value: string }[];
  categoryName: string;
  sizes: { value: string }[];
}

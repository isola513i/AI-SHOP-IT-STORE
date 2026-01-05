export interface Product {
  id: string;
  title: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'GPU' | 'Notebook' | 'Accessory';
  rating: number;
  reviews: number;
  badge?: string;
  // Specialized product fields
  discount?: string;
  oldPrice?: number;
  chip?: string;
  chipColorClass?: string;
  specs?: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColorClass: string;
  buttonText: string;
  alt: string;
}

export interface Brand {
  id: string | number;
  name: string;
  logo: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type GPUProduct = Product;
export type NotebookProduct = Product;
export type BestSellerProduct = Product;
export type StoreProduct = Product;
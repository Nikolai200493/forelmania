/** Категория товаров */
export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  subcategories?: Subcategory[];
}

/** Подкатегория */
export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

/** Товар */
export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  subcategoryId?: string;
  price: number;
  oldPrice?: number;
  weight: string;
  image: string;
  images?: string[];
  description: string;
  shortDescription: string;
  inStock: boolean;
  badge?: 'new' | 'sale' | 'hit';
  nutritionPer100g?: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}

/** Элемент корзины */
export interface CartItem {
  product: Product;
  quantity: number;
}

/** Статья */
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}

/** Отзыв */
export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
}

/** Настройки сайта */
export interface SiteConfig {
  name: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  social: {
    telegram?: string;
    vk?: string;
    instagram?: string;
  };
}

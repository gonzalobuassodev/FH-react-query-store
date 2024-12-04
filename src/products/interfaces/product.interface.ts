export interface Product {
  id: number;
  title?: string;
  price: number;
  description?: string;
  category: string;
  image?: string;
  rating?: Rating;
  name?: string;
}

interface Rating {
  rate: number;
  count: number;
}

export interface ProductLite {
  id?: number;
  title?: string;
  price: number;
  description?: string;
  category: string;
  image?: string;
  name?: string;
}
export interface Product {
  id: number;
  imageSrc: string;
  stars: 0 | 1 | 2 | 3 | 4 | 5;
  ratings: number;
  price: number;
  title: string;
  quantity: number;
  tags?: ProductTag[];
}

export interface ProductTag {
  title: string;
  color: string;
}

export type Stars = 0 | 1 | 2 | 3 | 4 | 5;

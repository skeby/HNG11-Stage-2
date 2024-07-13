export interface Product {
  id: string
  unique_id: string
  name: string
  description: string | null
  photos: ProductImage[]
  current_price: Price[]
  stars: 0 | 1 | 2 | 3 | 4 | 5
  available_quantity: number
  is_deleted: boolean
  ratings: number
  quantity: number
  loading?: boolean
  tags?: ProductTag[]
}

export interface ProductImage {
  file_name: string
  url: string
}

export interface Price {
  [key: string]: number[]
}

export interface ProductTag {
  title: string
  color: string
}

export type Stars = 0 | 1 | 2 | 3 | 4 | 5

export interface CheckoutFormFields {
  first_name: string
  last_name: string
  email: string
  phone: string
  address: string
  country_code: string
  mode_of_payment: string
  description: string
}

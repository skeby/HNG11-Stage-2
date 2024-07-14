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
  company_name?: string
  address: string
  country: string
  state: string
  city: string
  zip_code: string
  email: string
  phone: string
  name_on_card: string
  card_number: string
  expiry_date: string
  cvc: string
  order_notes?: string
  country_code: string
  mode_of_payment: string
  description: string
}

export interface ICheckoutBody {
  unique_id?: string
  customer_id?: string
  organization_id: string
  products_sold: {
    product_id: string
    amount: string
    quantity: number
    discount: number
    currency_code: string
  }[]
  purchased_for?: string
  discount?: number
  currency_code: string
  customer_title?: string
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  country_code?: string
  mode_of_payment?: string
  sales_status?: string
  description?: string
}

export type RequestBody = ICheckoutBody | {}

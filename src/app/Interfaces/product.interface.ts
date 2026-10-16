export interface ProductInterface
{
    id?: number,
    name: string ,
    brand: string | null,
    count: number ,
    price_per_item: number | null,
    price: number,
    seller: string | null,
    quantity: number| null,
    description: string | null,
    product_type: string| null,
    purchase_date: Date,
    created_at?: string| null,
    updated_at?: string| null,
    classification: string| null,
    unit_of_measurement: string| null
  }

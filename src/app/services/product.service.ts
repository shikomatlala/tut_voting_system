import { Injectable, signal, inject } from "@angular/core";
import { ProductInterface } from "../Interfaces/product.interface";


@Injectable({
  providedIn: "root"
})

export class ProductService
{
  private id = signal<number | undefined>(0);
  private name = signal<string>("");
  private brand = signal<string | null>("");
  private count = signal<number>(0);
  private pricePerItem = signal<number | null>(0.0);
  private price = signal<number >(0.0);
  private seller = signal<string | null>("");
  private quantity = signal<number | null>(0.0);
  private description = signal<string | null>("");
  private productType = signal<string | null>("");
  private purchaseDate = signal<Date>(new Date());
  private createdAt = signal<string | null | undefined>("");
  private updatedAt = signal<string | null | undefined>("");
  private classification = signal<string | null>("");
  private unitOfMeasurement = signal<string | null>("");

  constructor()
  {

  }

  getId()
  {
    return this.id();
  }
  getName()
  {
    return this.name();
  }
  getBrand()
  {
    return this.brand();
  }
  getCount()
  {
    return this.count();
  }
  getPricePerItem()
  {
    return this.pricePerItem();
  }
  getPrice()
  {
    return this.price();
  }
  getSeller()
  {
    return this.seller();
  }
  getQuantity()
  {
    return this.quantity();
  }
  getDescription()
  {
    return this.description();
  }
  getProductType()
  {
    return this.productType();
  }
  getPurchaseDate()
  {
    return this.purchaseDate();
  }
  getCreatedAt()
  {
    return this.createdAt();
  }
  getUpdatedAt()
  {
    return this.updatedAt();
  }
  getClassification()
  {
    return this.classification();
  }
  getUnitOfMeasurement()
  {
    return this.unitOfMeasurement();
  }

  setProduct(product: ProductInterface) : void
  {
    if(product != undefined)
    {
      this.id.set(product.id);
      this.name.set(product.name);
      this.brand.set(product.brand);
      this.count.set(product.count);
      this.pricePerItem.set(product.price_per_item);
      this.price.set(product.price);
      this.seller.set(product.seller);
      this.quantity.set(product.quantity);
      this.description.set(product.description);
      this.productType.set(product.product_type);
      this.purchaseDate.set(product.purchase_date);
      this.createdAt.set(product.created_at);
      this.updatedAt.set(product.updated_at);
      this.classification.set(product.classification);
      this.unitOfMeasurement.set(product.unit_of_measurement);
    }
  }
}

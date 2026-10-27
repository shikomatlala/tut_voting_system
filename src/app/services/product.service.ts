import { Injectable, signal, inject } from "@angular/core";
import { ProductInterface } from "../Interfaces/product.interface";
import {catchError, finalize,of, map, Observable } from "rxjs";
import { URL } from "../global/url.variable";
import { SnackbarService } from "./snackbar.service";
import { UiDialog } from "../components/ui-dialog/ui-dialog";
import { HttpClient } from "@angular/common/http";
import { UIDialogService } from "./ui-dialog.service";
import { ProductListServicve } from "./productList.service";

@Injectable({
  providedIn: "root"
})

export class ProductService
{
  private snackbarService = inject(SnackbarService);
  private productListService = inject(ProductListServicve);
  private uiDialogService = inject(UIDialogService);
  private url = URL + "/product";
  private http = inject(HttpClient);
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
  private isProductSelected = signal<boolean>(false);
  private productTypes = signal<string[]>([]);
  private productClassifications = signal<string[]>([]);
  private productSellers = signal<string[]>([]);
  private productPurchaseDates = signal<string[]>([]);

  constructor()
  {

  }


  setIsProductSelected(value:boolean) : void
  {
    this.isProductSelected.set(value);
  }


  update() : Observable<any>
  {
    return this.http
      .put(this.url, this.getProduct())
        .pipe(
          map((response:any)=>{
            this.snackbarService.setMessage(response.message);
            if(response.status)
            {
                this.id.set(response.data.id);
                this.name.set(response.data.name);
                this.brand.set(response.data.brand);
                this.count.set(response.data.count);
                this.pricePerItem.set(response.data.price_per_item);
                this.price.set(response.data.price);
                this.seller.set(response.data.seller);
                this.quantity.set(response.data.quantity == null ? 0 : response.data.quantity);
                this.description.set(response.data.description);
                this.productType.set(response.data.product_type);
                this.purchaseDate.set(response.data.purchase_date);
                this.createdAt.set(response.data.created_at);
                this.updatedAt.set(response.data.updated_at);
                this.classification.set(response.data.classification);
                this.unitOfMeasurement.set(response.data.unit_of_measurement);
                this.productListService.getProductsFromServer().subscribe();
            }
          }),
          catchError((err)=>{
            if(err.error.message)
            {
              this.snackbarService.setMessage(err.error.message);
              return err.error.message
            }
            else
            {
              this.snackbarService.setMessage("an error occured");
              return of(err);
            }
          }),
          finalize(()=>{
            this.snackbarService.startSnackBar();
          })
        )
  }


  setName(value:string) : void
  {
    this.name.set(value);
  }
  setBrand(value:string) : void
  {
    this.brand.set(value);
  }
  setCount(value:number) : void
  {
    this.count.set(value);
  }
  setPricePerItem(value:number) : void
  {
    this.pricePerItem.set(value);
  }
  setPrice(value:number) : void
  {
    this.price.set(value);
  }
  setSeller(value:string) : void
  {
    this.seller.set(value);
  }
  setQuantity(value:number) : void
  {
    this.quantity.set(value);
  }
  setDescription(value:string) : void
  {
    this.description.set(value);
  }
  setProductType(value:string) : void
  {
    this.productType.set(value);
  }
  setPurchaseDate(value:Date) : void
  {
    this.purchaseDate.set(value);
  }
  setClassification(value:string) : void
  {
    this.classification.set(value);
  }
  setUnitOfMeasurement(value:string) : void
  {
    this.unitOfMeasurement.set(value);
  }

  getProduct()
  {
    let tempPurchaseDate = new Date(this.purchaseDate());


    return {
      id:this.id(),
      name:this.name(),
      brand:this.brand(),
      count:this.count(),
      pricePerItem:this.pricePerItem(),
      price:this.price(),
      seller:this.seller(),
      quantity:this.quantity(),
      description:this.description(),
      productType:this.productType(),
      purchaseDate:tempPurchaseDate.toISOString().slice(0, 19).replace('T', ' '),
      classification:this.classification(),
      unitOfMeasurement:this.unitOfMeasurement()
    }
  }

  delete() : Observable<any>
  {
    if(this.isProductSelected())
    {
      return this.http
        .delete(this.url+ `?id=${this.id()}`)
          .pipe(
            map((response:any)=>{
              this.snackbarService.setMessage(response.message);
              this.productListService.getProductsFromServer().subscribe();
              this.clear();
            }),
            catchError((err)=>{
              if(err.error.message)
              {
                this.snackbarService.setMessage(err.error.message);
                return err.error.message;
              }
              else
              {
                this.snackbarService.setMessage("Erorr: an error occured while attempting to delete");
                return of(err);
              }
            }),
            finalize(()=>{
              this.snackbarService.startSnackBar();
            })
          )
    }
    else
    {
      this.snackbarService.setMessage("no product selected");
      this.snackbarService.startSnackBar();
      return of({status: true, message: "no product selected"});
    }

  }
  getIsProductSelected() : boolean
  {
    return this.isProductSelected();
  }
  getId() : number | undefined
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

  clear() : void
  {
    this.setIsProductSelected(false);
    this.id.set(0);
    this.name.set("");
    this.brand.set("");
    this.count.set(0);
    this.pricePerItem.set(0.0);
    this.price.set(0.0);
    this.seller.set("");
    this.quantity.set(0.0);
    this.description.set("");
    this.productType.set("");
    this.purchaseDate.set(new Date());
    this.createdAt.set("");
    this.updatedAt.set("");
    this.classification.set("");
    this.unitOfMeasurement.set("");
  }
  setProduct(product: ProductInterface) : void
  {
    this.setIsProductSelected(false);
    if(product != undefined)
    {
      this.id.set(product.id);
      this.name.set(product.name);
      this.brand.set(product.brand);
      this.count.set(product.count);
      this.pricePerItem.set(product.price_per_item);
      this.price.set(product.price);
      this.seller.set(product.seller);
      this.quantity.set(product.quantity == null ? 0 : product.quantity);
      this.description.set(product.description);
      this.productType.set(product.product_type);
      this.purchaseDate.set(product.purchase_date);
      this.createdAt.set(product.created_at);
      this.updatedAt.set(product.updated_at);
      this.classification.set(product.classification);
      this.unitOfMeasurement.set(product.unit_of_measurement);
      this.setIsProductSelected(true);
    }
  }
}

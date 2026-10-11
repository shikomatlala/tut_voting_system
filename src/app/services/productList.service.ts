import { Injectable, signal } from "@angular/core";
import { ProductBookInterface } from "../Interfaces/productBook.interface";
import { Product } from "../pages/product/product";
import { ProductInterface } from "../Interfaces/product.interface";
import { PageMetadataInterface } from "../Interfaces/pageMetadata.interface";



@Injectable({
  providedIn: "root"
}) //This means this service can be injected into other components

export class ProductListServicve
{
  private isSearchOn = signal<boolean>(false);
  private productBook = signal<ProductBookInterface[]>([]);
  private productCollection = signal<ProductInterface[]>(this.getActiveProductCollection())
  private showPerPage = signal<number>(100);
  private totalNumberOfPage = signal<number>(this.productCollection().length / this.showPerPage());
  private pages = signal<PageMetadataInterface[]>([{pageNumber: 1, pageIndex: 0, isPageActive: true, recordsPerPage: 100}]);
  private columnTitles = [
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "ID", reference: "id" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Name", reference: "name" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Price per item", reference: "price_per_item" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Price", reference: "price" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Count", reference: "count" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Seller", reference: "seller" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Purchase Date", reference: "purchase_date" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Quantity", reference: "quantity" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Classification", reference: "classification" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Unit of Measurement", reference: "unit_of_measurement" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Description", reference: "description" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Product Type", reference: "product_type" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Brand", reference: "brand" },
  ]

  constructor()
  {

  }


  getColumnTitles()
  {
    return this.columnTitles;
  }


  getSearchStatus()
  {
    return true;
  }

  getActiveProductCollection() : ProductInterface[]
  {
    return []
  }

  search(value:string)
  {

  }
}

import { Injectable, signal , inject} from "@angular/core";
import { ProductBookInterface } from "../Interfaces/productBook.interface";
import { Product } from "../pages/product/product";
import { ProductInterface } from "../Interfaces/product.interface";
import { PageMetadataInterface } from "../Interfaces/pageMetadata.interface";
import { PRODUCT_COLLECTION } from "../data/product.collection";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, finalize, map, Observable, of } from "rxjs";
import { SnackbarService } from "./snackbar.service";
import { URL } from "../global/url.variable";
import { UIDialogService } from "./ui-dialog.service";


@Injectable({
  providedIn: "root"
}) //This means this service can be injected into other components

export class ProductListServicve
{
  private snackbarService = inject(SnackbarService);
  private uiDialogService = inject(UIDialogService);
  private url = URL + "/product";
  private http = inject(HttpClient);
  private productListFilterParameter = signal<{field: string, value: string}>({field: "all", value: ""});
  private totalEntitiesCount = signal<number>(0);
  private totalProducts = signal<number>(0);
  private totalPrice = signal<number>(0.0);
  private totalPricePerItem = signal<number>(0.0);
  private isSearchOn = signal<boolean>(false);
  private productBook = signal<ProductBookInterface[]>([]);
  private activeProductCollection = signal<ProductInterface[]>(PRODUCT_COLLECTION);
  private productCollection = signal<ProductInterface[]>(this.getActiveProductCollection())
  private showPerPage = signal<number>(100);
  private totalNumberOfPage = signal<number>(this.productCollection().length / this.showPerPage());
  private pages = signal<PageMetadataInterface[]>([{pageNumber: 1, pageIndex: 0, isPageActive: true, recordsPerPage: 100}]);
  private productTypes = signal<Array<{id:string, value:string}>>([]);
  private productClassifications = signal<Array<{id:string, value:string}>>([]);
  private productSellers = signal<Array<{id:string, value:string}>>([]);
  private productBrands = signal<Array<{id:string, value:string}>>([]);
  private productNames = signal<Array<{id:string, value:string}>>([]);
  private productPurchaseDates = signal<Array<{id:string, value:string}>>([]);

  private columnTitles = [
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "ID", reference: "id" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Name", reference: "name" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Price per item", reference: "price_per_item" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Price", reference: "price" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Count", reference: "count" },
    // { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Quantity", reference: "quantity" },
    // { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Classification", reference: "classification" },
    // { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Unit of Measurement", reference: "unit_of_measurement" },
    // { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Description", reference: "description" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Product Type", reference: "product_type" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Brand", reference: "brand" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Seller", reference: "seller" },
    { isSortAscending: true, ascendingIcon: "arrowDropDown", descendingIcon: "arrowDropUp", caption: "Purchase Date", reference: "purchase_date" },
  ]

  constructor()
  {
    this.getProductsFromServer();
    this.productBook().push({
      page:{
        pageData: this.getActiveProductCollection(),
        pageDetails: {
          pageNumber: 1,
          pageIndex: 0,
          isPageActive: true,
          recordsPerPage: 100
        }
      }
    });

    this.setActiveProductCollection();
    this.updateTheTotalNumberOfPages();
  }

  setProductTypes(): Observable<any>
  {
    return this.http
      .get(this.url + `/query/group?field=productType`)
        .pipe(
          map((response:any)=>{
            if(response.status)
            {
              this.productTypes.set(response.data.product_types);
            }
          })
        )
  }
 getProductClassifications() : Array<{id:string, value:string}>
 {
  return this.productClassifications();
 }
 getProductPurchaseDates(): Array<{id:string, value:string}>
 {
  return this.productPurchaseDates();
 }
 getProductNames(): Array<{id:string, value:string}>
 {
  return this.productNames();
 }
 getProductBrands(): Array<{id:string, value:string}>
 {
  return this.productBrands();
 }
 getProductSellers(): Array<{id:string, value:string}>
 {
  return this.productSellers();
 }
 getProductTypes(): Array<{id:string, value:string}>
 {
  return this.productTypes();
 }
  setProductNames(): Observable<any>
  {
    return this.http
      .get(this.url + `/query/group?field=name`)
        .pipe(
          map((response:any)=>{
            if(response.status)
            {
              this.productNames.set(response.data.names);
            }
          })
        )
  }
  setProductBrands(): Observable<any>
  {
    return this.http
      .get(this.url + `/query/group?field=brand`)
        .pipe(
          map((response:any)=>{
            if(response.status)
            {
              this.productBrands.set(response.data.brands);
            }
          })
        )
  }
  setProductSellers(): Observable<any>
  {
    return this.http
      .get(this.url + `/query/group?field=seller`)
        .pipe(
          map((response:any)=>{
            if(response.status)
            {
              this.productSellers.set(response.data.sellers);
            }
          })
        )
  }
  setProductPurchaseDates(): Observable<any>
  {
    return this.http
      .get(this.url + `/query/group?field=purchaseDate`)
        .pipe(
          map((response:any)=>{
            if(response.status)
            {
              this.productPurchaseDates.set(response.data.purchase_dates);
            }
          })
        )
  }
  setProductClassifications(): Observable<any>
  {
    return this.http
      .get(this.url + `/query/group?field=classification`)
        .pipe(
          map((response:any)=>{
            if(response.status)
            {
              this.productClassifications.set(response.data.classifications);
            }
          })
        )
  }

  deleteProduct(product: any) : Observable<any>
  {
    return this.http
      .delete(this.url+ `?id=${product.id}`)
        .pipe(
          map((response:any)=>{
            this.snackbarService.setMessage(response.message);
            this.getProductsFromServer().subscribe();
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
            console.log("delete success");
            this.snackbarService.startSnackBar();
          })
        )

  }

  addProduct(product:any) : Observable<any>
  {
    return this.http
      .post(this.url, product)
        .pipe(
          map((response:any)=>{
            this.snackbarService.setMessage(response.message);
            return response;
          }),
          catchError((err)=>{
            if(err.error.message)
            {
              this.snackbarService.setMessage(err.error.message);
              return err.error.message;
            }
            else
            {
              this.snackbarService.setMessage("Erorr: Product could get added");
              return of(err);
            }
          }),
          finalize(()=>{
            this.snackbarService.startSnackBar();
          })
        )
  }

  resetAllFilters()
  {
    this.getProductsFromServer().subscribe((response=>{
      this.snackbarService.setMessage("Filters have been removed");
      this.snackbarService.startSnackBar()
    }));
  }

  sort(key:string)
  {
    if(!this.getSearchStatus())
    {
      for(let x  = 0; x < this.columnTitles.length; x++)
      {
        if(key == this.columnTitles[x].reference)
        {
          if(!this.columnTitles[this.columnTitles.findIndex(columnTitles => columnTitles.reference === key)].isSortAscending)
          {
            this.resetAllSortOptions();
            this.columnTitles[this.columnTitles.findIndex(columnTitles => columnTitles.reference === key)].isSortAscending = true;
            this.activeProductCollection().sort(
              function (a:ProductInterface, b: ProductInterface)
              {
                console.log(typeof a[key as keyof ProductInterface]);
                switch(typeof a[key as keyof ProductInterface])
                {
                  case "number" :
                    //I want to let the compiler know that this case will always be a number
                    return Number(a[key as keyof ProductInterface]) - Number(b[key as keyof ProductInterface]);
                  case "string":
                    return a[key as keyof ProductInterface]!.toString().localeCompare(b[key as keyof ProductInterface]!.toString());
                  case "object" :
                    const dateA = new Date(a[key as keyof ProductInterface]!);
                    const dateB = new Date(b[key as keyof ProductInterface]!);
                    return dateA.getTime() - dateB.getTime();
                    // return a[key as keyof ProductInterface]!.getTime() - Dateb[key as keyof ProductInterface]!.getTime());
                  default :
                    return a[key as keyof ProductInterface]!.toString().localeCompare(b[key as keyof ProductInterface]!.toString());
                }
              }
            )
          }
          else
          {
            this.resetAllSortOptions();
            this.columnTitles[this.columnTitles.findIndex(columnTitles => columnTitles.reference === key)].isSortAscending = false;
            this.activeProductCollection().sort(
              function (a:ProductInterface, b:ProductInterface)
              {
                switch(typeof a[key as keyof ProductInterface])
                {
                  case "number" :
                    //I want to let the compiler know that this case will always be a number
                    return Number(b[key as keyof ProductInterface]) - Number(a[key as keyof ProductInterface]);
                  case "string":
                    return b[key as keyof ProductInterface]!.toString().localeCompare(a[key as keyof ProductInterface]!.toString());
                  case "object" :
                    const dateA = new Date(a[key as keyof ProductInterface]!);
                    const dateB = new Date(b[key as keyof ProductInterface]!);
                    return dateB.getTime() - dateA.getTime();
                    // return b[key as keyof ProductInterface]!.toString().localeCompare(a[key as keyof ProductInterface]!.toString());
                  default :
                    return b[key as keyof ProductInterface]!.toString().localeCompare(a[key as keyof ProductInterface]!.toString());
                }
              }
            )
          }
        }
      }
    }
    else
    {
      for(let x  = 0; x < this.columnTitles.length; x++)
      {
        if(key == this.columnTitles[x].reference)
        {
          if(!this.columnTitles[this.columnTitles.findIndex(columnTitles => columnTitles.reference === key)].isSortAscending)
          {
            this.resetAllSortOptions();
            this.columnTitles[this.columnTitles.findIndex(columnTitles => columnTitles.reference === key)].isSortAscending = true;
            this.productCollection().sort(
              function (a:ProductInterface, b: ProductInterface)
              {
                console.log(typeof a[key as keyof ProductInterface]);
                switch(typeof a[key as keyof ProductInterface])
                {
                  case "number" :
                    //I want to let the compiler know that this case will always be a number
                    return Number(a[key as keyof ProductInterface]) - Number(b[key as keyof ProductInterface]);
                  case "string":
                    return a[key as keyof ProductInterface]!.toString().localeCompare(b[key as keyof ProductInterface]!.toString());
                  case "object" :
                    const dateA = new Date(a[key as keyof ProductInterface]!);
                    const dateB = new Date(b[key as keyof ProductInterface]!);
                    return dateA.getTime() - dateB.getTime();
                  default :
                    return a[key as keyof ProductInterface]!.toString().localeCompare(b[key as keyof ProductInterface]!.toString());
                }
              }
            )
          }
          else
          {
            this.resetAllSortOptions();
            this.columnTitles[this.columnTitles.findIndex(columnTitles => columnTitles.reference === key)].isSortAscending = false;
            this.productCollection().sort(
              function (a:ProductInterface, b:ProductInterface)
              {
                switch(typeof a[key as keyof ProductInterface])
                {
                  case "number" :
                    //I want to let the compiler know that this case will always be a number
                    return Number(b[key as keyof ProductInterface]) - Number(a[key as keyof ProductInterface]);
                  case "string":
                    return b[key as keyof ProductInterface]!.toString().localeCompare(a[key as keyof ProductInterface]!.toString());
                  case "object" :
                    const dateA = new Date(a[key as keyof ProductInterface]!);
                    const dateB = new Date(b[key as keyof ProductInterface]!);
                    return dateB.getTime() - dateA.getTime();
                  default :
                    return b[key as keyof ProductInterface]!.toString().localeCompare(a[key as keyof ProductInterface]!.toString());
                }
              }
            )
          }
        }
      }

    }

  }
  resetAllSortOptions()
  {
    for(let x = 0; x < this.columnTitles.length; x++)
    {
      this.columnTitles[x].isSortAscending = true;
    }
  }

  getPages()
  {
    return this.pages();
  }

  getColumnTitles()
  {
    return this.columnTitles;
  }


  setShowPerPage(value:number) : number
  {
    this.showPerPage.set(value);
    this.updatePages();
    return this.showPerPage();

  }


  setPageActive(index: number ) : void
  {
    for(let x = 0; x < this.productBook().length; x++)
    {
      this.productBook()[x].page.pageDetails.isPageActive = false;
    }
    this.productBook()[index].page.pageDetails.isPageActive = true;
  }

  setActiveProductCollection()
  {
    this.getActiveProductCollection();
    // this.activeProductCollection.set(PRODUCT_COLLECTION);
  }

  getTheTotalNumberOfPages()
  {
    return this.totalNumberOfPage();
  }
  updatePages()
  {
    let tempProductCollection = structuredClone(this.getActiveProductCollection());
    this.productCollection.set(this.getActiveProductCollection());
    this.pages().length = 0;
    this.productBook().length = 0;
    var productCollectionLength = this.productCollection().length;
    var totalPages = productCollectionLength / this.showPerPage();
    for(let x = 0; x < totalPages; x++)
    {
      this.productBook().push({
        page:
        {
          pageDetails: {
            pageNumber: x + 1,
            pageIndex: x,
            isPageActive: x == 0 ? true: false,
            recordsPerPage : this.showPerPage()
          },
          pageData: tempProductCollection.splice(0, this.showPerPage())
        }
      })
      this.pages().push(this.productBook()[x].page.pageDetails)
    }

    this.updateTheTotalNumberOfPages();
    return this.pages();
  }

  updateTheTotalNumberOfPages()
  {
    this.totalNumberOfPage.set(this.getActiveProductCollection().length);
  }
  getSearchStatus()
  {
    return this.isSearchOn();
  }

  getTotalProducts() : number
  {
    return this.totalProducts();
  }

  getTotalPricePerItem() : number
  {
    return this.totalPricePerItem();
  }

  getTotalPrice() : number
  {
    return this.totalPrice();
  }

  setProductListFilterParameter(queryParams: {field: string, value: string})
  {
    this.productListFilterParameter.set(queryParams);
  }

  filterProductList(queryParams: {field: string, value:string}, filterType?:string)
  {
    this.productListFilterParameter.set(queryParams);
    this.queryProductsFromServer(this.productListFilterParameter(), filterType).subscribe();
  }

  queryProductsFromServer(queryParams: {field: string, value: string}, filterType?:string) : Observable<any>
  {
    var configuredURL = `${this.url}/query/field?field=${queryParams.field}&value=${queryParams.value}`;
    console.log(configuredURL);
    return this.http
      .get(configuredURL)
        .pipe(
          map((response:any)=>{
            if(response.status)
            {
              // this.snackbarService.setMessage(`Products are now filtered by ${queryParams.field} ${queryParams.value}`);
              this.snackbarService.setMessage(`Products are now filtered by ${filterType ? filterType : queryParams.field}`);
              const products = response.data;
              let tempTotalPricePerItem: number  = 0.0;
              let tempTotalPrice: number = 0.0;
              let tempTotalEntitiesCount: number  = 0;
              this.totalProducts.set(products.length);
              for(let x = 0; x < products.length; x++)
              {
                products[x].purchase_date = new Date(products[x].purchase_date);
                tempTotalPricePerItem += products[x].price_per_item;
                tempTotalPrice += products[x].price;
                tempTotalEntitiesCount += products[x].count;
                products[x].purchase_date = new Date(products[x].purchase_date);
              }
              this.totalPrice.set(tempTotalPrice);
              this.totalPricePerItem.set(tempTotalPricePerItem);
              this.totalEntitiesCount.set(tempTotalEntitiesCount)
              this.activeProductCollection.set(products);
            }
            return response;
          }),
          catchError((err)=>{
            if(err.error.message)
            {
              console.log(err);
              this.snackbarService.setMessage(err.error.message);
              return err.error.message;
            }
            else
            {
              this.snackbarService.setMessage("an error occured during products list retrieval");
              return of(err);
            }
          }),
          finalize(()=>{
            this.snackbarService.startSnackBar();
          })
        )
  }

  getProductsFromServer() : Observable<any>
  {
    return this.http
      .get(this.url)
        .pipe(
          map((response:any)=>{
            if(response.status)
            {
              this.setProductClassifications().subscribe();
              this.setProductNames().subscribe();
              this.setProductBrands().subscribe();
              this.setProductPurchaseDates().subscribe();
              this.setProductSellers().subscribe();
              this.setProductTypes().subscribe();
            }
            const products = response.data;
            if(products.length > 0)
            {
              let tempTotalPricePerItem: number  = 0.0;
              let tempTotalPrice: number = 0.0;
              let tempTotalEntitiesCount: number  = 0;
              this.totalProducts.set(products.length);
              for(let x = 0; x < products.length; x++)
              {
                products[x].purchase_date = new Date(products[x].purchase_date);
                tempTotalPricePerItem += products[x].price_per_item;
                tempTotalPrice += products[x].price;
                tempTotalEntitiesCount += products[x].count;
                products[x].purchase_date = new Date(products[x].purchase_date);
              }
              this.totalPrice.set(tempTotalPrice);
              this.totalPricePerItem.set(tempTotalPricePerItem);
              this.totalEntitiesCount.set(tempTotalEntitiesCount)
            }
            this.activeProductCollection.set(products);
            return response;
          }),
          catchError((err)=>{
            if(err.error.message)
            {
              this.snackbarService.setMessage(err.error.message);
              this.snackbarService.startSnackBar();
              return err.error.message;
            }
            else
            {
              this.snackbarService.setMessage("an error occured during products list retrieval");
              this.snackbarService.startSnackBar();
              return of(err);
            }
          })
        )

  }


  getActiveProductCollection() : ProductInterface[]
  {
    // this.getProductsFromServer().subscribe();
    return this.activeProductCollection();
  }

  getProductBookPage(pageNumber: number)
  {
    console.log(this.productBook());
    return this.productBook()[pageNumber].page.pageData;
  }


  getActivePageIndex()
  {
    for(let x = 0; x < this.productBook().length; x++)
    {
      if(this.productBook()[x].page.pageDetails.isPageActive)
      {
        return this.productBook()[x].page.pageDetails.pageIndex;
      }
    }
    return 0;
  }

  getShowPerPage()
  {
    return this.showPerPage();
  }

  getTotalEntitiesCount()
  {
    return this.totalEntitiesCount();
  }

  getTotalListCount()
  {
    return this.productCollection().length;
  }

  getProductCollection()
  {
    return this.productCollection();
  }

  search(value:string)
  {
    if(value != "")
    {
      this.isSearchOn.set(true);
      this.productCollection.set(this.getActiveProductCollection());
      return this.productCollection.set(this.productCollection().filter(product => product.name.toString().toLowerCase().includes(value.toLowerCase())))
    }
    this.isSearchOn.set(false);
    return this.productCollection.set(this.getActiveProductCollection());
  }
}

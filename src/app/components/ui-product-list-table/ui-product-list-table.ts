import { Component, inject, OnInit } from '@angular/core';
import { UiTableModule } from '../ui-table/ui-table.module';
import { ProductListServicve } from '../../services/productList.service';
import { UiButton } from '../ui-button/ui-button';
import { UpperCasePipe } from '@angular/common';
import { UiIcon } from '../ui-icon/ui-icon';
import { UiCardModule } from '../ui-card/ui-card.module';
import { UiInput } from '../ui-input/ui-input';
import { FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { UiForm } from '../ui-form/ui-form';

@Component({
  selector: 'ui-product-list-table',
  imports: [
    UiTableModule,
    UpperCasePipe,
    UiIcon,
    UiButton,
    UiCardModule,
    FormsModule,
    UiInput,
    ReactiveFormsModule
],
  templateUrl: './ui-product-list-table.html',
  styleUrl: './ui-product-list-table.css',
})
export class UiProductListTable implements OnInit {
  productListService = inject(ProductListServicve);
  productForm : FormGroup = new FormGroup(
    {
      name:  new FormControl(""),
      pricePerItem:  new FormControl(0.0),
      price:  new FormControl(0.0),
      count:  new FormControl(1),
      seller:  new FormControl(""),
      purchaseDate:  new FormControl(new Date()),
      productType:  new FormControl(""),
      brand:  new FormControl("")
    }
  );
  ngOnInit(): void {
    this.productListService.getProductsFromServer().subscribe();
    this.productForm = new FormGroup(
      {
        name:  new FormControl(""),
        pricePerItem:  new FormControl(0.0),
        price:  new FormControl(0.0),
        count:  new FormControl(1),
        seller:  new FormControl(""),
        purchaseDate:  new FormControl(new Date()),
        productType:  new FormControl(""),
        brand:  new FormControl("")
      }
    );
  }

  clear(productForm: FormGroup)
  {
    console.log(productForm.value);
    this.productForm.reset();
  }

  addProduct( productForm: FormGroup)
  {
    let product = {
      product: productForm.value
    };
    console.log("NEW PRODUCT", product);
    this.productListService.addProduct(product).subscribe((response)=>{
      console.log(response);
    });
  }



}

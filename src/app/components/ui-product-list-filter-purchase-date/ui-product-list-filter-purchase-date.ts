import { Component, inject, input } from '@angular/core';
import { UiOption } from '../ui-option/ui-option';
import { NgClass } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { UiInputField } from '../ui-input-field/ui-input-field';
import { UiInputLabel } from '../ui-input-label/ui-input-label';
import { ProductListServicve } from '../../services/productList.service';

@Component({
  selector: 'ui-product-list-filter-purchase-date',
  imports: [
    UiOption,
    NgClass,
    FormsModule,
    UiInputField,
    UiInputLabel
  ],
  templateUrl: './ui-product-list-filter-purchase-date.html',
  styleUrl: './ui-product-list-filter-purchase-date.css',
})
export class UiProductListFilterPurchaseDate {

  productListService = inject(ProductListServicve);
  today = new Date();
  labelName = input<string>("Purhcase Date");

  filterProdcutPurchaseDates(purchaseDate: NgModel, filterOption: NgModel)
  {

    this.productListService.filterProductPurchaseDates({property: filterOption.value, value: purchaseDate.value});
  }


}

import { Component, inject, input } from '@angular/core';
import { UiOption } from '../ui-option/ui-option';
import { NgClass } from '@angular/common';
import { ProductListServicve } from '../../services/productList.service';
import { FormsModule, NgModel } from '@angular/forms';
import { UiInputField } from '../ui-input-field/ui-input-field';
import { UiInputLabel } from '../ui-input-label/ui-input-label';

@Component({
  selector: 'ui-product-list-filters',
  imports: [UiOption, NgClass, FormsModule, UiInputField, UiInputLabel],
  templateUrl: './ui-product-list-filters.html',
  styleUrl: './ui-product-list-filters.css',
})
export class UiProductListFilters {
  productListService = inject(ProductListServicve);
  dataSource = input.required<Array<{ id?: string, value: string }> >();
  labelName= input<string>("Seller")
  filterType = input<string>("all");

  filterProductList(filterOption : NgModel)
  {
    console.log(filterOption.value);
    this.productListService.filterProductList({field: this.filterType(), value: filterOption.value}, this.labelName())

  }
}


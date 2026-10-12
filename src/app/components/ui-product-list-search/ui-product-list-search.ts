import { Component, signal, inject } from '@angular/core';
import { UiInputField } from '../ui-input-field/ui-input-field';
import { FormsModule, NgModel } from '@angular/forms';
import { UiButtonIcon } from '../ui-button-icon/ui-button-icon';
import { ProductListServicve } from '../../services/productList.service';
@Component({
  selector: 'app-ui-product-list-search',
  imports: [
    UiInputField,
    FormsModule,
    UiButtonIcon
],
  templateUrl: './ui-product-list-search.html',
  styleUrl: './ui-product-list-search.css',
})

export class UiProductListSearch {

  public searchValue:string = "";
  public isSearchInputSelected = signal<boolean>(false);
  public productListService = inject(ProductListServicve);

  constructor()
  {

  }

  clearSearchInputBox()
  {
    this.searchValue = "";
  }


}

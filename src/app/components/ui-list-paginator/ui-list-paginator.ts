import { Component,inject } from '@angular/core';
import { ProductListServicve } from '../../services/productList.service';
import { UiButton } from '../ui-button/ui-button';
import { NgClass } from '@angular/common';
import { UiIcon } from '../ui-icon/ui-icon';
import { UiToggleButtonItem } from '../ui-toggle-button-item/ui-toggle-button-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ui-list-paginator',
  imports: [
    UiButton,
    NgClass,
    UiIcon,
    UiToggleButtonItem,
    FormsModule
],
  templateUrl: './ui-list-paginator.html',
  styleUrl: './ui-list-paginator.css',
})
export class UiListPaginator {

  public productListService = inject(ProductListServicve)
  

}

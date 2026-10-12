import { Component, inject } from '@angular/core';
import { UiTableModule } from '../ui-table/ui-table.module';
import { ProductListServicve } from '../../services/productList.service';
import { UiButtonIcon } from '../ui-button-icon/ui-button-icon';
import { UiButton } from '../ui-button/ui-button';
import { UpperCasePipe } from '@angular/common';
import { UiIcon } from '../ui-icon/ui-icon';
import { UiCardModule } from '../ui-card/ui-card.module';

@Component({
  selector: 'ui-product-list-table',
  imports: [
    UiTableModule,
    UpperCasePipe,
    UiIcon,
    UiButton,
    UiCardModule
],
  templateUrl: './ui-product-list-table.html',
  styleUrl: './ui-product-list-table.css',
})
export class UiProductListTable {

  productListService = inject(ProductListServicve);


}

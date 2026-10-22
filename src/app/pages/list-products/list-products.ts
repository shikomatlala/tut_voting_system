import { Component, inject } from '@angular/core';
import { UiProductListSearch } from '../../components/ui-product-list-search/ui-product-list-search';
import { UiProductListTable } from '../../components/ui-product-list-table/ui-product-list-table';
import { UiProductView } from '../../components/ui-product-view/ui-product-view';
import { UiListPaginator } from '../../components/ui-list-paginator/ui-list-paginator';
import { TableLayoutControlService } from '../../services/tableLayoutControl.service';

@Component({
  selector: 'list-products',
  imports: [UiProductListSearch, UiProductListTable, UiProductView, UiListPaginator],
  templateUrl: './list-products.html',
  styleUrl: './list-products.css',
})
export class ListProducts {

  public uiTableLayoutControlService = inject(TableLayoutControlService);

}

import { Component, inject } from '@angular/core';
import { UiProductListSearch } from '../../components/ui-product-list-search/ui-product-list-search';
import { UiProductListTable } from '../../components/ui-product-list-table/ui-product-list-table';
import { UiProductView } from '../../components/ui-product-view/ui-product-view';
import { UiListPaginator } from '../../components/ui-list-paginator/ui-list-paginator';
import { TableLayoutControlService } from '../../services/tableLayoutControl.service';
import { UiAddProductTableRowStyle } from '../../components/ui-add-product-table-row-style/ui-add-product-table-row-style';
import { UiCardModule } from '../../components/ui-card/ui-card.module';
import { ProductListServicve } from '../../services/productList.service';
import { UiProductListFilters } from '../../components/ui-product-list-filters/ui-product-list-filters';

@Component({
  selector: 'list-products',
  imports: [
    UiProductListSearch,
    UiProductListTable,
    UiProductView,
    UiProductListFilters,
    UiCardModule],
  templateUrl: './list-products.html',
  styleUrl: './list-products.css',
})
export class ListProducts {

  public productListSerivce = inject(ProductListServicve);
  public uiTableLayoutControlService = inject(TableLayoutControlService);

}

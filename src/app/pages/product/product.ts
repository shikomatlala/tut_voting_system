import { Component, inject } from '@angular/core';
import { UiTopNav } from '../../components/ui-top-nav/ui-top-nav';
import { UiSideNav } from '../../components/ui-side-nav/ui-side-nav';
import { BallotBox } from '../../components/ballot-box/ballot-box';
import { UiProductListTable } from '../../components/ui-product-list-table/ui-product-list-table';
import { UiProductListSearch } from '../../components/ui-product-list-search/ui-product-list-search';
import { UiListPaginator } from '../../components/ui-list-paginator/ui-list-paginator';
import { UiTableLayoutControls } from '../../components/ui-table-layout-controls/ui-table-layout-controls';
import { TableLayoutControlService } from '../../services/tableLayoutControl.service';
import { UiProductView } from '../../components/ui-product-view/ui-product-view';
import { RouterOutlet } from '@angular/router';
import { UiProductsTabGroup } from '../../components/ui-products-tab-group/ui-products-tab-group';

@Component({
  selector: 'app-product',
  imports: [
    UiTopNav,
    UiSideNav,
    RouterOutlet,
    UiProductListSearch,
    UiProductsTabGroup
],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  uiTableLayoutControlService = inject(TableLayoutControlService);


}

import { Component } from '@angular/core';
import { UiTopNav } from '../../components/ui-top-nav/ui-top-nav';
import { UiSideNav } from '../../components/ui-side-nav/ui-side-nav';
import { BallotBox } from '../../components/ballot-box/ballot-box';
import { UiProductListTable } from '../../components/ui-product-list-table/ui-product-list-table';
import { UiProductListSearch } from '../../components/ui-product-list-search/ui-product-list-search';

@Component({
  selector: 'app-product',
  imports: [UiTopNav, UiSideNav, UiProductListTable, UiProductListSearch],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {}

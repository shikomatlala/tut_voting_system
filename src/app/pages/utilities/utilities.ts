import { Component } from '@angular/core';
import { UiTopNav } from '../../components/ui-top-nav/ui-top-nav';
import { UiSideNav } from '../../components/ui-side-nav/ui-side-nav';
import { UiProductsTabGroup } from '../../components/ui-products-tab-group/ui-products-tab-group';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-utilities',
  imports: [UiTopNav, UiSideNav, UiProductsTabGroup, RouterOutlet],
  templateUrl: './utilities.html',
  styleUrl: './utilities.css',
})
export class Utilities {}

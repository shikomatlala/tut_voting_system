import { Component } from '@angular/core';
import { UiTopNav } from '../../components/ui-top-nav/ui-top-nav';
import { UiSideNav } from '../../components/ui-side-nav/ui-side-nav';

@Component({
  selector: 'app-account',
  imports: [UiTopNav, UiSideNav],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {}

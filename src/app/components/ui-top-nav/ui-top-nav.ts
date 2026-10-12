import { Component } from '@angular/core';
import { Header } from '../header/header';
import { LogoutComponent } from '../logout-component/logout-component';

@Component({
  selector: 'ui-top-nav',
  imports: [Header, LogoutComponent],
  templateUrl: './ui-top-nav.html',
  styleUrl: './ui-top-nav.css',
})
export class UiTopNav {}

import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { LogoutComponent } from '../../components/logout-component/logout-component';
import { BallotBox } from '../../components/ballot-box/ballot-box';
import { UiSideNav } from '../../components/ui-side-nav/ui-side-nav';
import { UiButtonIcon } from '../../components/ui-button-icon/ui-button-icon';
import { UiTopNav } from '../../components/ui-top-nav/ui-top-nav';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    BallotBox,
    UiSideNav,
    UiTopNav,
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {


  goTo(page:string)
  {

  }


}

import { NgClass} from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UiButtonIcon } from '../ui-button-icon/ui-button-icon';
import { isActive, Router } from '@angular/router';

@Component({
  selector: 'ui-side-nav',
  imports: [
    NgClass,
    UiButtonIcon
  ],
  templateUrl: './ui-side-nav.html',
  styleUrl: './ui-side-nav.css',
})
export class UiSideNav implements OnInit {

  private router = inject(Router);
  public tabs = [

    { name : "product", isActive: false, iconCode: "shoppingCart", label: "Products" }

  ]

  goTo(page:string)
  {
    this.router.navigate([`${page}`]);
  }


  getActiveTab(tabName: string) : boolean
  {
    for(let tab of this.tabs)
    {
      if(tab.name == tabName)
      {
        return tab.isActive;
      }
    }
    return false;
  }



  ngOnInit(): void {

    // 1. Get the router url and remove the 1st slash
    let urlInitial = this.router.url.substring(this.router.url.indexOf('/') + 1);
    // 2. Check if another slash exists.
    if(urlInitial.indexOf('/') > 0)
    {
      // 2.a If the slash exists then substring up to that slash.
      urlInitial = urlInitial.substring(0, urlInitial.indexOf('/'));
    }
    // 2.b If the slash does not exists then there is no need to do anything

    for(let x = 0; x < this.tabs.length; x++)
    {
      if(this.tabs[x].name == urlInitial)
      {
        this.tabs[x].isActive = true;
      }
      else
      {
        this.tabs[x].isActive = false;
      }
    }

  }

}

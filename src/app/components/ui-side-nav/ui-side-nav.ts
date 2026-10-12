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
    for(let x = 0; x < this.tabs.length; x++)
    {
      if(this.tabs[x].name == this.router.url.replace('/', ''))
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

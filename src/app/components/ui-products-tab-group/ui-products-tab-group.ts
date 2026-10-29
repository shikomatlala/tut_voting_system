import { Component, inject, OnInit } from '@angular/core';
import { UiTabGroup } from '../ui-tab-group/ui-tab-group';
import { UiTab } from '../ui-tab/ui-tab';
import { UiButton } from '../ui-button/ui-button';
import { UiTabButton } from '../ui-tab-button/ui-tab-button';
import { isActive, Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ui-products-tab-group',
  imports: [UiTabGroup, UiTab, UiTabButton, NgClass],
  templateUrl: './ui-products-tab-group.html',
  styleUrl: './ui-products-tab-group.css',
})
export class UiProductsTabGroup implements OnInit {

  private router = inject(Router);
  public tabs = [
    { name: "list-products", isActive: false, iconCode: "list", label: "List Products"},
    { name: "statistics", isActive: false, iconCode: "barChart", label: "Statistics"}
  ]

  goTo(page:string)
  {
    this.resetTabs();
    //check if current tab matches any page if so set it as true
    this.router.navigate([`product/${page}`]);
    for(let x = 0; x < this.tabs.length; x++)
    {
      if(this.tabs[x].name == this.getCurrentTab())
      {
        this.tabs[x].isActive = true;
      }
      else
      {
        this.tabs[x].isActive = false;
      }
    }
  }

  resetTabs()
  {
    for(let x = 0; x < this.tabs.length; x++)
    {
      this.tabs[x].isActive = false;
    }

  }
  getActiveTab(tabName: string) : boolean
  {
    for(let x = 0; x < this.tabs.length; x++)
    {
      if(this.tabs[x].name == this.getCurrentTab() && this.tabs[x].name == tabName)
      {
        this.tabs[x].isActive = true;
        return true;
      }
      else
      {
        this.tabs[x].isActive = false;
      }
    }
    return false;
  }

  getCurrentTab()
  {
    return this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
  }

  ngOnInit() : void {

    let urlInitial = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
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

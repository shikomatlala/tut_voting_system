import { Component } from '@angular/core';

@Component({
  selector: 'li[ui-tab]',
  template: `<ng-content>`,
  styleUrl: './ui-tab.css',
})
export class UiTab {}

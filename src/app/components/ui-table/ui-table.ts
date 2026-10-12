import { Component } from '@angular/core';

@Component({
  selector: 'table[ui-table]',
  standalone: false,
  template: `<ng-content>`,
  styleUrl: './ui-table.css',
})
export class UiTable {}

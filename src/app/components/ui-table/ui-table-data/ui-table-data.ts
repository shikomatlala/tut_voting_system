import { Component } from '@angular/core';

@Component({
  selector: 'td[ui-table-data]',
  standalone: false,
  template: `<ng-content>`,
  styleUrl: './ui-table-data.css',
})
export class UiTableData {}

import { Component } from '@angular/core';

@Component({
  selector: 'tr[ui-table-row]',
  standalone: false,
  template: `<ng-content>`,
  styleUrl: './ui-table-row.css',
})
export class UiTableRow {}

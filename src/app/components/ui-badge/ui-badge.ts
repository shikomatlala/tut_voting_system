import { Component } from '@angular/core';

@Component({
  selector: 'p[ui-badge], span[ui-badge]',
  template: `<ng-content>`,
  styleUrl: './ui-badge.css',
})
export class UiBadge {}

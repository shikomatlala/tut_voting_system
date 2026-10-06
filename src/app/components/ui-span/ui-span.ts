import { Component } from '@angular/core';

@Component({
  selector: 'span[ui-span]',
  template: `<ng-content>`,
  styleUrl: './ui-span.css',
})
export class UiSpan {}

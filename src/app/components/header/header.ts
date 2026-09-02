import { Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
  selector: 'ui-header',
  imports: [
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  iconHeight  = input<string>("100%");
  iconWidth = input<string>("150");
}

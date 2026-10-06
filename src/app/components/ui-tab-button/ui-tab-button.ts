import { Component, input } from '@angular/core';
import { UiIcon } from '../ui-icon/ui-icon';

@Component({
  selector: 'buttton[ui-tab-button]',
  imports: [UiIcon],
  templateUrl: './ui-tab-button.html',
  styleUrl: './ui-tab-button.css',
})
export class UiTabButton {
  iconCode = input<string>("");
  iconColor = input<string>("blue");
  iconHeight = input<string>("24");
  iconWidth = input<string>("24");


}

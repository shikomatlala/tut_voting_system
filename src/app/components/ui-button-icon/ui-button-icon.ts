import { Component, input } from '@angular/core';
import { UiIcon } from '../ui-icon/ui-icon';

@Component({
  selector: 'app-ui-button-icon',
  imports: [
    UiIcon
  ],
  templateUrl: './ui-button-icon.html',
  styleUrl: './ui-button-icon.css',
})
export class UiButtonIcon {
  iconWidth = input<string>("24");
  iconHeight= input<string>("24");
  iconCode = input.required<string>();
  iconColor = input.required<string>();
  isIconFilled = input<boolean>(false);



}

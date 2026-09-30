import { Component, input } from '@angular/core';
import { UiIcon } from '../ui-icon/ui-icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'button[ui-button]',
  imports: [
    UiIcon
  ],
  templateUrl: './ui-button.html',
  styleUrl: './ui-button.css',
})
export class UiButton {

  iconCode = input<string>("");
  iconColor = input<string>("blue");
  isIconfilled = input<boolean>(false);

}

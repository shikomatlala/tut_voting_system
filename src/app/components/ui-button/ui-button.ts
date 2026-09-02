import { Component, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'button[ui-button]',
  imports: [
    Icon,
  ],
  templateUrl: './ui-button.html',
  styleUrl: './ui-button.css',
})
export class UiButton {

  iconCode = input<string>("");
  iconType = input<string>("");

}

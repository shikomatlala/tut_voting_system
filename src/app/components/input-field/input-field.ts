import {
  Component,
  ViewEncapsulation,
  input

 } from '@angular/core';
import { Label } from "../label/label";
import { Icon } from '../icon/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'div[uiInputField]',
  imports: [
    NgClass,
    Label,
    Icon
  ],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
})
export class InputField {
  configuration = input<configuration>();
  isFocus = input.required<boolean>();
  hasIcon = input<boolean>(false);
  hasLabel = input<boolean>(false);
  label = input<string>("");
  isFlex = input<boolean>(false);
}


interface configuration
{
  icon?: string,
  type: string,
  flex?: boolean,
  hasIcon: boolean,
  hasLabel?: boolean,
  labelName?: string
}

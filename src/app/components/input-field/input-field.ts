import { Component, input, inject, signal } from '@angular/core';
import { Icon } from '../icon/icon';
import { PasswordControllerService } from '../../services/password-controller.service';
import { NgClass } from '@angular/common';



@Component({
  selector: 'div[ui-input-field]',
  imports: [
    Icon,
    NgClass
],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
})
export class InputField {
  passwordControllor = inject(PasswordControllerService);
  readonly BLANK_ICON = { type: "", src: "", code: "" , alt: "" };
  iconCode = input<string>("");
  iconType = input<string>("");
  isFocus = input.required<boolean>();
  hasIcon = input<boolean>(false);
  isPasswordType = input<boolean>(false);
  isShowPasswordButtonFocused = signal<boolean>(false);


}




import { Component, input, inject, signal } from '@angular/core';
import { UiIcon} from '../ui-icon/ui-icon';
import { PasswordControllerService } from '../../services/password-controller.service';
import { NgClass } from '@angular/common';



@Component({
  selector: 'div[ui-input-field]',
  imports: [
    UiIcon,
    NgClass
  ],
  templateUrl: './ui-input-field.html',
  styleUrl: './ui-input-field.css',
})
export class UiInputField {
  passwordControllor = inject(PasswordControllerService);
  readonly BLANK_ICON = { type: "", src: "", code: "", alt: "" };
  iconCode = input<string>("");
  iconColor= input<string>("blue");
  isIconFilled = input<boolean>(true);
  hasIcon = input<boolean>(false);
  isPasswordType = input<boolean>(false);
  isShowPasswordButtonFocused = signal<boolean>(false);


}




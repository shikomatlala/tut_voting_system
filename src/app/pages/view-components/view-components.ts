import { Component,signal,inject } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';
import { UiIcon } from '../../components/ui-icon/ui-icon';
import { UiInputField } from '../../components/ui-input-field/ui-input-field';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { PasswordControllerService } from '../../services/password-controller.service';

@Component({
  selector: 'app-view-components',
  imports: [
    UiIcon,
    UiInputField,
    FormsModule,
  ],
  templateUrl: './view-components.html',
  styleUrl: './view-components.css',
})
export class ViewComponents {

  loginResponseMessage = signal<String>("");
  isPasswordInputSelected = signal<boolean>(false);
  isStudentNumberInputSelected = signal<boolean>(false);
  passwordController = inject(PasswordControllerService)
  snackbar = inject(SnackbarService);

}

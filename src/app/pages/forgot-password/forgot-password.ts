import { Component, inject,signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FormsModule, NgForm } from '@angular/forms';
import { RecoverPasswordService } from '../../services/recoverPassword.service';
import { LoaderService } from '../../services/loader.service';
import { UiButton } from "../../components/ui-button/ui-button";
import { InputField } from "../../components/input-field/input-field";
import { UiForm } from "../../components/ui-form/ui-form";
import { Icon } from "../../components/icon/icon";
import { Header } from "../../components/header/header";
import { CardModule } from '../../components/card/card.module';
import { NgClass } from '@angular/common';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  imports: [
    RouterLink,
    FormsModule,
    UiButton,
    InputField,
    UiForm,
    Header,
    CardModule,
    NgClass
],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {

  snackbar = inject(SnackbarService);
  isStudentNumberInputSelected = signal<boolean>(false);
  loaderService = inject(LoaderService);
  recoverPasswordService = inject(RecoverPasswordService);

  showError(forgotPasswordForm: NgForm)
  {
    var controls = forgotPasswordForm.controls;
    if(!controls['username'].valid)
    {
      this.snackbar.setMessage("please enter student number");
    }
    this.snackbar.startSnackBar();
  }


  onSubmit(forgotPasswordForm: NgForm)
  {
    if(forgotPasswordForm.valid)
    {
      this.recoverPasswordService.initiateRecoverPassword(forgotPasswordForm.value).subscribe();
    }
  }

}

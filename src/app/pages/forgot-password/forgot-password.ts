import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FormsModule, NgForm } from '@angular/forms';
import { RecoverPasswordService } from '../../services/recoverPassword.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-forgot-password',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {

  loaderService = inject(LoaderService);
  recoverPasswordService = inject(RecoverPasswordService);
  onSubmit(forgotPasswordForm: NgForm)
  {
    this.recoverPasswordService.initiateRecoverPassword(forgotPasswordForm.value).subscribe();
  }

}

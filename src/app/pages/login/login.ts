import { Component, inject, signal } from '@angular/core';
import { UiInputField } from "../../components/ui-input-field/ui-input-field";
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginCredentials } from '../../Interfaces/loginCredentials.interface';
import { LoaderService } from '../../services/loader.service';
import { UiForm } from "../../components/ui-form/ui-form";
import { PasswordControllerService } from '../../services/password-controller.service';
import { UiButton } from "../../components/ui-button/ui-button";
import { NgClass } from '@angular/common';
import { SnackbarService } from '../../services/snackbar.service';
import { Header } from "../../components/header/header";
import { UiCardModule } from "../../components/ui-card/ui-card.module";
import { UIDialogService } from '../../services/ui-dialog.service';


@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
    UiForm,
    UiInputField,
    UiButton,
    NgClass,
    Header,
    UiCardModule
],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router: Router) { }

  loginResponseMessage = signal<string>("");
  isPasswordInputSelected = signal<boolean>(false);
  isStudentNumberInputSelected = signal<boolean>(false);
  snackbar = inject(SnackbarService);
  uiDialogService = inject(UIDialogService);


  passwordController = inject(PasswordControllerService)
  loginService = inject(LoginService);
  loaderService = inject(LoaderService);

  loginCredentials: LoginCredentials = { username: "", password: "" };
  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.loginCredentials.username = loginForm.value.username;
      this.loginCredentials.password = loginForm.value.password;
      this.loginService.initiateLogin(this.loginCredentials).subscribe((message: any) => {
        this.loginResponseMessage.set(message);
      });
    }
  }
  onCancel()
  {


  }
  onDelete()
  {

  }
  showError(loginForm: NgForm) {
    var controls = loginForm.controls;
    if (!controls['password'].valid) {
      this.snackbar.setMessage("please enter password");
    }
    if (!controls['username'].valid) {
      this.snackbar.setMessage("please enter student number");
    }
    this.snackbar.startSnackBar();
  }

}

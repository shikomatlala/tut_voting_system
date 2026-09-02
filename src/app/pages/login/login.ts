import { Component, inject,signal } from '@angular/core';
import { Input } from "../../components/input/input";
import { InputField } from "../../components/input-field/input-field";
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginCredentials } from '../../Interfaces/loginCredentials.interface';
import { LoaderService } from '../../services/loader.service';
import { Icon } from "../../components/icon/icon";
import { UiForm } from "../../components/ui-form/ui-form";
import { PasswordControllerService } from '../../services/password-controller.service';
import { UiButton } from "../../components/ui-button/ui-button";
import { NgClass } from '@angular/common';
import { Snackbar } from '../../components/snackbar/snackbar';
import { SnackbarService } from '../../services/snackbar.service';
import { loginGuard } from '../../guards/login-guard';
import { Header } from "../../components/header/header";
import { CardModule } from "../../components/card/card.module";


@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
    UiForm,
    InputField,
    UiButton,
    NgClass,
    Header,
    CardModule
],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router: Router)
  {}

  loginResponseMessage = signal<String>("");
  isPasswordInputSelected = signal<boolean>(false);
  isStudentNumberInputSelected= signal<boolean>(false);
  snackbar = inject(SnackbarService);


  passwordController = inject(PasswordControllerService)
  loginService = inject(LoginService);
  loaderService = inject(LoaderService);

  loginCredentials: LoginCredentials = {username: "", password: ""};
  onSubmit(loginForm: NgForm)
  {
    if(loginForm.valid)
    {
      this.loginCredentials.username = loginForm.value.username;
      this.loginCredentials.password = loginForm.value.password;
      this.loginService.initiateLogin(this.loginCredentials).subscribe((message:any)=>{
        this.loginResponseMessage.set(message);
      });
    }
  }
  showError(loginForm: NgForm)
  {
    var controls = loginForm.controls;
    if(!controls['password'].valid)
    {
      this.snackbar.setMessage("please enter password");
    }
    if(!controls['username'].valid)
    {
      this.snackbar.setMessage("please enter student number");
    }
    this.snackbar.startSnackBar();
  }

}

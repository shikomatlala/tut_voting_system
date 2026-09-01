import { Inject, Injectable, signal } from "@angular/core";



@Injectable({providedIn: "root"})
export class PasswordControllerService
{
  protected isShowPassword = signal<boolean>(false);

  toggleShowPassword()
  {
    this.isShowPassword.set(!this.isShowPassword());
  }
  showPassword()
  {
    this.isShowPassword.set(true);
  }
  hidePassword()
  {
    this.isShowPassword.set(false);
  }

  getIsShowPassword()
  {
    return this.isShowPassword();
  }
}

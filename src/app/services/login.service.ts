import { HttpClient } from '@angular/common/http';
import { LoginCredentials } from '../Interfaces/loginCredentials.interface';
import { inject, Service } from '@angular/core';
import { map, Observable, finalize, catchError } from 'rxjs';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { URL } from '../global/url.variable';
import { SnackbarService } from './snackbar.service';

@Service()//This tells typescript that you can use the class as an injectable depedency
export class LoginService {

  constructor()
  {}
  private isLoggedIn:boolean  = false;
  private snackbarService = inject(SnackbarService);
  private isLoginAttempted:boolean = false;
  private isOTPSent:boolean = false;
  private http = inject(HttpClient);
  private loaderService = inject(LoaderService);
  private router = inject(Router);
  private url = URL + "/student/login";
  //How do we want to login.
  //1. Get the login data.
  //2. Validate the login data
  //3. Send the login data to the backend.
  //4. Wait for the response from the backend.
  //5. Send the reponse to the relevant page.


  getIsOTPSent():boolean
  {
    return this.isOTPSent;
  }
  getIsLoginAttempted():boolean
  {
    return this.isLoginAttempted;
  }
  setIsLoggedIn(isLoggedIn:boolean)
  {
    this.isLoggedIn = isLoggedIn;
  }
  getIsLoggedIn()
  {
    return this.isLoggedIn;
  }
  setIsOTPSent(isOTPSent:boolean)
  {
    this.isOTPSent = true;
  }

  initiateLogin(loginCredentials:LoginCredentials) //I am not implementing this interface, rather I am using this interface to declare a type
  {
    this.snackbarService.stopSnackBar();
    this.loaderService.startLoader();
    this.isLoginAttempted = true;
    return this.http
      .post(this.url + "/initiate", loginCredentials)
        .pipe(
          map((response:any)=>{
            this.snackbarService.setMessage(response.message);
            if(response.result)
            {
              this.isOTPSent = true;
              this.router.navigate(["validate-otp"]);
            }
            else
            {
              this.isOTPSent = false;
            }
            this.loaderService.stopLoader();
            return response.message;}
          ),
          catchError((err)=>{
            if(err.error.message)
            {
              this.snackbarService.setMessage(err.error.message);
              return err.error.message;
            }
            return err;
          }),
          finalize(()=>{
            this.loaderService.stopLoader();
            this.snackbarService.startSnackBar();
          })

        );
  }

}

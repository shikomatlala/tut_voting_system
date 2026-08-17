
import { HttpClient } from '@angular/common/http';
import { LoginCredentials } from '../Interfaces/loginCredentials.interface';
import { inject, Service } from '@angular/core';
import { map, Observable, of, finalize, catchError } from 'rxjs';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { OTPInterface } from '../Interfaces/otp.interface';
import { SnackbarService } from './snackbar.service';

@Service()//This tells typescript that you can use the class as an injectable depedency
export class OTPService{

  private snackbarService = inject(SnackbarService);
  private isOTPRecieved: boolean = false;
  private isOTPValid: boolean = false;
  private http = inject(HttpClient);
  private router = inject(Router);
  private loaderService = inject(LoaderService);
  private loginService = inject(LoginService);
  private url = "http://localhost:3000/student/login";



  getIsOTPRecieved():boolean
  {
    return this.isOTPRecieved;
  }

  getIsOTPValid():boolean
  {
    return this.isOTPValid;
  }

  completeLogin(otpData:OTPInterface):Observable<any>
  {
    this.loaderService.startLoader();
    if(
        !this.loginService.getIsLoggedIn() &&
        this.loginService.getIsOTPSent() &&
        this.loginService.getIsLoginAttempted() &&
        otpData.otp.length === 6
      )
    {
      return this.http
        .post(this.url + "/complete", otpData)
          .pipe(
            map((response:any)=>{
              this.snackbarService.setMessage(response.message);
              if(response.result)
              {
                this.loginService.setIsLoggedIn(true);
                this.isOTPValid = true;
                this.isOTPRecieved = true;
                this.router.navigate(["elections"])
              }
              else
              {
                this.loginService.setIsLoggedIn(false);
                this.isOTPValid = false;
                this.isOTPRecieved = false;
              }
              this.loaderService.stopLoader();
              return of(response.message);
            }),
            catchError((err)=>{
              if(err.error.message){
                this.snackbarService.setMessage(err.error.message);
                return err.error.message;
              }
              else {
                this.snackbarService.setMessage("an error occured, please refresh the page and try again");
              }
              return err;
            }),
            finalize(()=>{
              this.loaderService.stopLoader();
              this.snackbarService.startSnackBar();
            })

          )
    }
    else
    {
      this.loaderService.stopLoader();
      return of("Cannot submit OTP before login");
    }
  }

  resendOTP():Observable<string>
  {
    if(
      this.loginService.getIsLoginAttempted() &&
      !this.loginService.getIsLoggedIn() &&
      this.loginService.getIsOTPSent()
    )
    {
      this.loaderService.startLoader();
      this.loginService.setIsOTPSent(false);
      return this.http
      .get(this.url + "/resend-otp")
        .pipe(
          map((response:any)=>{
            this.snackbarService.setMessage(response.message);
            if(response.result){
              this.loginService.setIsOTPSent(true);
            }
            else{
              this.router.navigate(["login"]);
              this.loginService.setIsOTPSent(false);
            }
            this.loaderService.stopLoader();
            return response.message;
          }),
          catchError((err)=>{
            this.router.navigate(["login"]);
            if(err.error.message){
              this.snackbarService.setMessage(err.error.message);
              // this.router.navigate(["login"]);
              return err.error.message;
            }
            else {
              this.snackbarService.setMessage("an error occured, please refresh the page and try again");
            }
            return err;
          }),
          finalize(()=>{
            this.loaderService.stopLoader();
            this.snackbarService.startSnackBar();
          })
        );
    }
    else
    {
      this.router.navigate(["login"]);
      this.snackbarService.setMessage("Cannot resend OTP you must login first");
      this.snackbarService.startSnackBar();
      return of("Cannot resend OTP");
    }
  }


}

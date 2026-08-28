import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginCredentials } from '../Interfaces/loginCredentials.interface';
import { inject, Service } from '@angular/core';
import { map, Observable, finalize, catchError,of } from 'rxjs';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { URL } from '../global/url.variable';
import { SnackbarService } from './snackbar.service';
import { StudentSessionService } from './studentSession.service';

@Service()//This tells typescript that you can use the class as an injectable depedency
export class LoginService {

  constructor()
  {

  }
  private isLoggedIn:boolean  = false;
  private snackbarService = inject(SnackbarService);
  private isLoginAttempted:boolean = false;
  private isOTPSent:boolean = false;
  private http = inject(HttpClient);
  private loaderService = inject(LoaderService);
  private router = inject(Router);
  private sessionService = inject(StudentSessionService);
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

  logout(): Observable<any>
  {
    //------------------------------------
    // 1. Start Loader
    // 2. Clear local storage
    // 3. Navigate to login page
    // 4. Tell Server that I am login out.
    //------------------------------------
    this.loaderService.startLoader();
    localStorage.clear();
    this.router.navigate(['login']);

    return this.http
      .get(this.url + "/logout")
        .pipe(
          map((response:any)=>{
            this.snackbarService.setMessage(response.message);
            return response;
          }),
          catchError((err)=>{
            if(err.error.message)
            {
              this.snackbarService.setMessage(err.error.message);
              return err.error.message;
            }
            else
            {
              console.log(err);
              this.snackbarService.setMessage("an error occured, please refresh the page and try again");
              return of(err);
            }
          }),
          finalize(()=>{
            this.loaderService.stopLoader();
            this.snackbarService.startSnackBar();
          })
        )
  }

  getIsLoggedIn()
  {
    //-------------------------------------------------
    // CHEKC IF THE LOCAL VARIABLE HAS BEEN SET
    // It is important to do this, because if we loose the variable data we can
    // always get the same data from the localStorage.
    // We need to figure out the variables that cause our data to be lost.
    //-------------------------------------------------
    // const isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");
    // if(isLoggedInLocalStorage)
    // {
    //   return JSON.parse(isLoggedInLocalStorage);
    // }
    return this.isLoggedIn;
  }

  getLoginData():Observable<any>
  {
    this.loaderService.startLoader();
    const params = new HttpParams().set('sessionName', this.sessionService.getSessionName());
    const sessionName = this.sessionService.getSessionName();
    return this.http
            .get(this.url + `/get-login-data?sessionName=${sessionName}`)
              .pipe(
                map((response:any)=>{
                  if(response.result)
                  {
                    this.setIsLoggedIn(response.data.isLoggedIn);
                    this.setIsOTPSent(response.data.isOTPSent);
                    this.setIsLoginAttempted(response.data.isLoginAttempted);
                    this.sessionService.setSessionStatus(response.data.sessionStatus);
                  }
                  this.loaderService.stopLoader();
                  return response;
              }),
              catchError((err)=>{
                return of(err);
              }),
              finalize(()=>{
                this.loaderService.stopLoader();
              }));
  }

  initiateLogin(loginCredentials:LoginCredentials) //I am not implementing this interface, rather I am using this interface to declare a type
  {
    //----------------------------------------------------------------------------------
    // 1. Stop any exisiting snackbard
    // 2. Start the loader
    // 3. Set the login attempt parameter to true (what happens when we refresh the page?)
    // 4. fetch from http throught the post method
    //    4.1 If the response result is true
    //      4.1.1 set the isOTPSent parameter to true (What happens when we refresh the page?)
    //      4.1.2 navigate to the validate OTP Page
    //    4.2 If the response result is false
    //      4.2.1 set the isOTPSent parameter to false (this is a default value page refresh does not affect it)
    //    4.3 Catch any errors
    //    4.4 finalize (This operator runs a callback function when an Observable stream ends, it acts like finally block in a javascript try-catch statement)
    //----------------------------------------------------------------------------------
    // COMMENT
    // I think the one thing that has been giving me an issue is that I am not handling ui changes. I am only handling the backend changes.
    // I am seeing that when a page is refreshed don't parameters that keep record of what has
    //----------------------------------------------------------------------------------
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
  setIsLoggedIn(isLoggedIn:boolean)
  {
    //Set LocalStorage
    // localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    this.isLoggedIn = isLoggedIn;
  }
  setIsLoginAttempted(value:boolean)
  {
    this.isLoginAttempted = value;
  }
  setIsOTPSent(isOTPSent:boolean)
  {
    this.isOTPSent = isOTPSent;
  }
}

import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { catchError, throwError, finalize, map, Observable } from "rxjs";
import { Router } from "@angular/router";
import { LoaderService } from "./loader.service";
import { URL } from "../global/url.variable";
import { SnackbarService } from "./snackbar.service";


@Service()
export class RecoverPasswordService{

  private http = inject(HttpClient);
  private loaderService = inject(LoaderService);
  private snackbarService = inject(SnackbarService)
  private router = inject(Router);
  private isRecoverPasswordInitiated:boolean = false;
  private url = URL +  "/student/login/password";


  getIsRecoverPasswordInitiated()
  {
    return this.isRecoverPasswordInitiated;
  }

  initiateRecoverPassword(recoverPasswordData: {username: string}): Observable<any>
  {
    this.loaderService.startLoader();
    this.loaderService.setMessage("Sending to server...");
    return this.http
      .post(this.url + "/start-recover", recoverPasswordData)
      .pipe(
        map((response:any)=>{
          this.snackbarService.setMessage(response.message);
          this.snackbarService.startSnackBar();
          if(response.status)
          {
            this.isRecoverPasswordInitiated = true;
          }
          else
          {
            this.isRecoverPasswordInitiated = false;
          }
          return response.message;
        }),
        catchError((err)=>{
          this.snackbarService.setMessage(err.error.message);
          return err.error.message;
        }),
        finalize(()=> {
          this.loaderService.stopLoader();
          this.snackbarService.startSnackBar();
        })
      );
  }



}


import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { map, Observable, pipe } from "rxjs";
import { StudentSessionService } from "./studentSession.service";
import { LoginService } from "./login.service";



@Injectable({providedIn: "root"})
export class AuthGuardService implements CanActivate
{
  studentSession = inject(StudentSessionService);
  loginService = inject(LoginService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    return this.loginService.getLoginData().pipe(map(response => {
      if(response.result)
      {
        return true;
      }
      else
      {
        return false;
      }
    }));

  }

}

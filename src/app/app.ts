import { Component, signal, inject, OnDestroy, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiLoader } from './components/ui-loader/ui-loader';
import { LoaderService } from './services/loader.service';
import { SnackbarService } from './services/snackbar.service';
import { StudentSessionService } from './services/studentSession.service';
import { LoginService } from './services/login.service';
import { Footer } from "./components/footer/footer";
import { Router } from "@angular/router";
import { UiSnackbar } from './components/ui-snackbar/ui-snackbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    UiLoader,
    RouterOutlet,
    UiSnackbar,
    Footer
  ]
})
export class App implements OnInit {

  constructor() {
  }


  loaderService = inject(LoaderService);
  snackBarService = inject(SnackbarService);
  studentSessionService = inject(StudentSessionService);
  loginService = inject(LoginService);
  private router = inject(Router);
  protected readonly title = signal('TUT Voting System');


  ngOnInit(): void {
    this.loginService.getLoginData().subscribe((response) => {
    });


    //The purpose of this is to clear all session data when this page loads.



  }

  // ngOnDestroy(): void {
  //   this.studentSessionService.clearLocalStorage();
  // }



}

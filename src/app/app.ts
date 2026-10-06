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
import { UiCardModule } from './components/ui-card/ui-card.module';
import { UIDialogService } from './services/ui-dialog.service';
import { UiDialog } from './components/ui-dialog/ui-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    UiCardModule,
    UiLoader,
    RouterOutlet,
    UiSnackbar,
    Footer,
    UiDialog
]
})
export class App implements OnInit {

  constructor() {
  }



  loaderService = inject(LoaderService);
  snackBarService = inject(SnackbarService);
  studentSessionService = inject(StudentSessionService);
  loginService = inject(LoginService);
  uiDialogService = inject(UIDialogService);
  private router = inject(Router);
  protected readonly title = signal('TUT Voting System');

  getRamdonPicture(): string {
    return `https://avatars.githubusercontent.com/u/525${Math.floor(Math.random() * (999 - 1) + 2)}?v=4&size=150`;
  }
  ngOnInit(): void {
    console.log("We are here");
    this.loginService.getLoginData().subscribe();
  }

}

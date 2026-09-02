import { Component, signal, inject, OnDestroy, HostListener, OnInit } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { Loader } from './components/loader/loader';
import { LoaderService } from './services/loader.service';
import { Snackbar } from "./components/snackbar/snackbar";
import { SnackbarService } from './services/snackbar.service';
import { StudentSessionService } from './services/studentSession.service';
import { LoginService } from './services/login.service';
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    Loader,
    RouterOutlet,
    Snackbar,
    Footer
]
})
export class App implements OnInit{


  loaderService  = inject(LoaderService);
  snackBarService = inject(SnackbarService);
  studentSessionService = inject(StudentSessionService);
  loginService = inject(LoginService);
  protected readonly title = signal('TUT Voting System');


  ngOnInit(): void {
    this.loginService.getLoginData().subscribe((response)=>{
    });
  }

  // ngOnDestroy(): void {
  //   this.studentSessionService.clearLocalStorage();
  // }



}

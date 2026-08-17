import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from './components/loader/loader';
import { LoaderService } from './services/loader.service';
import { Snackbar } from "./components/snackbar/snackbar";
import { SnackbarService } from './services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    Loader,
    RouterOutlet,
    Snackbar
]
})
export class App {

  loaderService  = inject(LoaderService);
  snackBarService = inject(SnackbarService);
  protected readonly title = signal('TUT Voting System');

}

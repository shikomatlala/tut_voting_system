import { Component, inject } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'uiSnackbar',
  imports: [],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.css',
})
export class Snackbar {

  snackBarService = inject(SnackbarService);


}



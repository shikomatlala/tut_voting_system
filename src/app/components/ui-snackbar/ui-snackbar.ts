import { Component, inject } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'ui-snackbar',
  imports: [],
  templateUrl: './ui-snackbar.html',
  styleUrl: './ui-snackbar.css',
})
export class UiSnackbar {

  snackBarService = inject(SnackbarService);


}



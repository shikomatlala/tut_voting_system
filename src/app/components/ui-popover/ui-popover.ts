import { Component,inject,input } from '@angular/core';
import { UiButtonIcon } from '../ui-button-icon/ui-button-icon';
import { UiSnackbar } from '../ui-snackbar/ui-snackbar';
import { SnackbarService } from '../../services/snackbar.service';
import { UIDialogService } from '../../services/ui-dialog.service';
import { UiDialog } from '../ui-dialog/ui-dialog';

@Component({
  selector: 'div[ui-popover], section[ui-popover]',
  imports: [UiButtonIcon, UiSnackbar, UiDialog],
  templateUrl: './ui-popover.html',
  styleUrl: './ui-popover.css',
})
export class UiPopover {

  snackBarService = inject(SnackbarService);
  uiDialogService = inject(UIDialogService);
  id = input.required<string>();

}

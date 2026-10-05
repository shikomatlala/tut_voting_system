import { Component,inject, input, ElementRef,  viewChild, OnInit } from '@angular/core';
import { UiButton } from '../ui-button/ui-button';
import { UIDialogService } from '../../services/ui-dialog.service';

@Component({
  selector: 'div[ui-dialog]',
  imports: [
    UiButton
  ],
  templateUrl: './ui-dialog.html',
  styleUrl: './ui-dialog.css',
})
export class UiDialog implements OnInit {
  uiDialogService = inject(UIDialogService);
  uIDialogTitle = input<string>("Are you sure?");
  uIDialogMessage = input<string>("This action cannot be undone.");

  constructor()
  {

  }
  ngOnInit(): void {

  }
  cancel():void
  {
    this.uiDialogService.setResponse(false);
    this.uiDialogService.hideModal();
  }

  confirm(): void
  {
    this.uiDialogService.setResponse(true);
    this.uiDialogService.hideModal();
  }

}

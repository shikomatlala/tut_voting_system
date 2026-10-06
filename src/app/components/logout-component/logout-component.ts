import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UiButton } from '../ui-button/ui-button';
import { UIDialogService } from '../../services/ui-dialog.service';
import { UiButtonIcon } from '../ui-button-icon/ui-button-icon';

@Component({
  selector: 'ui-logout',
  imports: [
    UiButtonIcon
  ],
  templateUrl: './logout-component.html',
  styleUrl: './logout-component.css',
})
export class LogoutComponent {

  private loginService = inject(LoginService);
  private uiDialogService = inject(UIDialogService);
  onClick()
  {
    this.uiDialogService.setTitle("Logout?");
    this.uiDialogService.setMessage("Do you want to logout? All of your unsaved data will be lost?");
    this.uiDialogService.showModal();
    this.uiDialogService.onConfirmEvent$.subscribe( data =>{
      if(data == true) {
        this.loginService.logout().subscribe();
      }
    })


  }


}

import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'uiLogout',
  imports: [],
  templateUrl: './logout-component.html',
  styleUrl: './logout-component.css',
})
export class LogoutComponent {

  private loginService = inject(LoginService);
  onClick()
  {
    /*
    When this is clicked my goal is to logout.
    The purpose of loggin out is to make sure that I clear out everything.
    */
    this.loginService.logout().subscribe();
  }


}

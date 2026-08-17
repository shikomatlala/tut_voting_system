import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-complete-login',
  imports: [
    FormsModule,
  ],
  templateUrl: './complete-login.html',
  styleUrl: './complete-login.css',
})
export class CompleteLogin {

  constructor(private router: Router)
  {}
  onSubmit(completeLoginForm: NgForm)
  {
    setTimeout(()=>{})
  }

}

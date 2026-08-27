import { Component,inject,OnInit,signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OTPService } from '../../services/otp.service';
import { LoginService } from '../../services/login.service';
import { StudentSessionService } from '../../services/studentSession.service';

@Component({
  selector: 'app-validate-otp',
  imports: [
    FormsModule,
  ],
  templateUrl: './validate-otp.html',
  styleUrl: './validate-otp.css',
})
export class ValidateOtp implements OnInit{
  constructor(private router: Router)
  {

  }
  reponseMessage = signal<String>("");
  otpService = inject(OTPService);
  loginService = inject(LoginService);
  sessionService = inject(StudentSessionService);
  onSubmit(validateOTPForm: NgForm)
  {
    this.otpService.completeLogin(validateOTPForm.value).subscribe();
  }
  resendOTP()
  {
    this.otpService.resendOTP().subscribe();
  }
  ngOnInit(): void {
    this.loginService.getLoginData().subscribe((response)=>{
      if(this.sessionService.getSessionStatus() == false)
      {
        this.loginService.logout();
      }
    });
  }

}

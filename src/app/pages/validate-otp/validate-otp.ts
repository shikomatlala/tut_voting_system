import { Component,inject,signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OTPService } from '../../services/otp.service';

@Component({
  selector: 'app-validate-otp',
  imports: [
    FormsModule,
  ],
  templateUrl: './validate-otp.html',
  styleUrl: './validate-otp.css',
})
export class ValidateOtp {
  constructor(private router: Router)
  {

  }
  reponseMessage = signal<String>("");
  otpService = inject(OTPService);
  onSubmit(validateOTPForm: NgForm)
  {
    this.otpService.completeLogin(validateOTPForm.value).subscribe();
  }
  resendOTP()
  {
    this.otpService.resendOTP().subscribe();
  }

}

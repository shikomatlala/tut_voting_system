import { Component,inject,OnInit,signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OTPService } from '../../services/otp.service';
import { LoginService } from '../../services/login.service';
import { StudentSessionService } from '../../services/studentSession.service';
import { CardModule } from '../../components/card/card.module';
import { Header } from '../../components/header/header';
import { UiForm } from '../../components/ui-form/ui-form';
import { InputField } from '../../components/input-field/input-field';
import { NgClass } from '@angular/common';
import { SnackbarService } from '../../services/snackbar.service';
import { UiButton } from '../../components/ui-button/ui-button';

@Component({
  selector: 'app-validate-otp',
  imports: [
    FormsModule,
    CardModule,
    Header,
    UiForm,
    InputField,
    NgClass,
    UiButton
  ],
  templateUrl: './validate-otp.html',
  styleUrl: './validate-otp.css',
})
export class ValidateOtp implements OnInit{
  intervalId = 0;
  reponseMessage = signal<string>("");
  isOTPInputSelected = signal<boolean>(false);
  isResendPasswordLocked = signal<boolean>(true);
  countDownSecondsLeft = signal<number>(60);
  timerValue: number = 60;
  snackbar = inject(SnackbarService);
  otpService = inject(OTPService);
  loginService = inject(LoginService);


  sessionService = inject(StudentSessionService);

  constructor(private router: Router)
  {
    this.intervalId = setInterval(()=>{
      this.timerValue--;
      this.countDownSecondsLeft.set(this.timerValue);
    }, 1000);
    this.unlockResendOTPButton();
  }
  onSubmit(otpForm: NgForm) {
    if(otpForm.valid) {
      this.otpService.completeLogin(otpForm.value).subscribe();
    }else
    {
      this.showError(otpForm);
    }
  }

  resendOTP() {
    if(!this.isResendPasswordLocked())
    {
      this.otpService.resendOTP().subscribe();
      this.lockResendOTPButton();
    }else
    {
      this.snackbar.setMessage("Cannot resend OTP now");
      this.snackbar.startSnackBar();
    }

  }

  lockResendOTPButton()//Thsi locks the button for 60 seconds
  {
    this.isResendPasswordLocked.set(true);
    this.intervalId = setInterval(()=>{
      this.timerValue--;
      this.countDownSecondsLeft.set(this.timerValue);
    }, 1000);
    this.unlockResendOTPButton();
  }

  unlockResendOTPButton()
  {
    setTimeout(()=> {
      this.isResendPasswordLocked.set(false);
      clearInterval(this.intervalId);
      this.timerValue = 60;
      this.countDownSecondsLeft.set(0);

    }, 60000);
  }

  ngOnInit(): void {
    this.loginService.getLoginData().subscribe((response)=>{
      if(this.sessionService.getSessionStatus() == false) {
        this.loginService.logout();
      }
    });
  }
  showError(otpForm: NgForm) {
    var controls = otpForm.controls;
    if(!controls['otp'].valid) {
      this.snackbar.setMessage("Enter a valid OTP");
    }
    this.snackbar.startSnackBar();
  }

}

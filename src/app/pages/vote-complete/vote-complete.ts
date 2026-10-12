import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../../components/header/header';
import { LogoutComponent } from '../../components/logout-component/logout-component';
import { UiButton } from '../../components/ui-button/ui-button';
import { StudentService } from '../../services/student.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-vote-complete',
  imports: [

  UiButton,
  Header,
  LogoutComponent


  ],
  templateUrl: './vote-complete.html',
  styleUrl: './vote-complete.css',
})
export class VoteComplete implements OnInit {
  constructor(private router: Router)
  {

  }
  loginService = inject(LoginService);
  studentService = inject(StudentService);

  goBackHome()
  {
    this.router.navigate(['elections']);
  }

  ngOnInit(): void {
    this.loginService.getLoginData().subscribe();
  }
}


import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../../components/header/header';
import { LogoutComponent } from '../../components/logout-component/logout-component';
import { UiButton } from '../../components/ui-button/ui-button';
import { StudentService } from '../../services/student.service';

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
export class VoteComplete {
  constructor(private router: Router)
  {

  }
  studentService = inject(StudentService);

  goBackHome()
  {
    this.router.navigate(['elections']);

  }
}

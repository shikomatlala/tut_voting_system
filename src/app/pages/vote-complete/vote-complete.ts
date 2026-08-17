import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vote-complete',
  imports: [],
  templateUrl: './vote-complete.html',
  styleUrl: './vote-complete.css',
})
export class VoteComplete {
  constructor(private router: Router)
  {

  }

  goBackHome()
  {
    this.router.navigate(['elections']);

  }
}

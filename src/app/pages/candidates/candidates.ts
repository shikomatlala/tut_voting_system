import { Component } from '@angular/core';
import { BallotPaper } from "../../components/ballot-paper/ballot-paper";
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-candidates',
  imports: [
    FormsModule,
  ],
  templateUrl: './candidates.html',
  styleUrl: './candidates.css',
})
export class Candidates {

  constructor(private router: Router)
  {

  }
  onSubmit(ballotPaperForm: NgForm)
  {
    this.router.navigate(["vote-complete"]);
  }


}

import { Component, inject, OnInit } from '@angular/core';
import { BallotPaper } from "../../components/ballot-paper/ballot-paper";
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Candidate } from "../../components/candidate/candidate";
import { ElectionService } from '../../services/election.service';
import { BallotBoxService } from '../../services/ballotBox.service';

@Component({
  selector: 'app-candidates',
  imports: [
    FormsModule,
    Candidate
],
  templateUrl: './candidates.html',
  styleUrl: './candidates.css',
})
export class Candidates implements OnInit {
  elections = inject(ElectionService);
  ballotBox = inject(BallotBoxService);
  constructor(private router: Router)
  {
    console.log(this.ballotBox.getCandidates());
  }

  onSubmit(ballotPaperForm: NgForm)
  {
    this.router.navigate(["vote-complete"]);
  }

  ngOnInit(): void {
    console.log("CANDIDATES", this.ballotBox.getCandidates());
  }

}

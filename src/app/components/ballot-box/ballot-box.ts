import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'uiBallotBox',
  imports: [],
  templateUrl: './ballot-box.html',
  styleUrl: './ballot-box.css',
})
export class BallotBox {
  constructor(private router: Router)
  {

  }

  startDate = new Date();
  endDate = new Date();
  ballotBox: BallotBoxInterface = {
    voteStatus: "Not Voted",
    dateVoted: null,
    hasVoted: false,
    ballotBoxId: 1024,
    propertyId: 1,
    electionYear: 2026,
    startDate: new Date(this.startDate.setDate(1)),
    endDate: new Date(this.endDate.setDate(15)),
    isOpen: true,
    ballotBoxName: "2026-LETHABONG BOKAMOS PROJECTS BALLOT BOX",
    numberOfCandiates: 15
  }
  goToCandidates(ballotBox: BallotBoxInterface)
  {

    console.log("clicked");
    this.router.navigate(["candidates"]);
  }

}


interface BallotBoxInterface
{

  dateVoted: Date | null,
  voteStatus: string,
  hasVoted:boolean,
  ballotBoxId: number,
  propertyId: number,
  electionYear: number,
  startDate: Date,
  endDate: Date,
  isOpen: boolean,
  ballotBoxName: string,
  numberOfCandiates : number

}

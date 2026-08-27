import { Component,input, AfterViewInit,OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BallotBoxService } from '../../services/ballotBox.service';
import { ElectionService } from '../../services/election.service';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'uiBallotBox',
  imports: [],
  templateUrl: './ballot-box.html',
  styleUrl: './ballot-box.css',
})
export class BallotBox {
  constructor( private router: Router)
  {
    console.log("constructor");

  }

  elections = inject(ElectionService);
  ballotBox = inject(BallotBoxService);
  property = inject(PropertyService);

  goToCandidates()
  {
    console.log("clicked");
    this.router.navigate(["candidates"]);
  }

}


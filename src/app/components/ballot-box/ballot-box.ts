import { Component,input, AfterViewInit,OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BallotBoxService } from '../../services/ballotBox.service';
import { ElectionService } from '../../services/election.service';
import { PropertyService } from '../../services/property.service';
import { Icon } from '../icon/icon';
import { UiButton } from "../ui-button/ui-button";
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'uiBallotBox',
  imports: [
    Icon,
    UiButton
],
  templateUrl: './ballot-box.html',
  styleUrl: './ballot-box.css',
})
export class BallotBox {
  constructor( private router: Router)
  {
    console.log("constructor");

  }

  snackbar = inject(SnackbarService);
  elections = inject(ElectionService);
  ballotBox = inject(BallotBoxService);
  property = inject(PropertyService);

  goToCandidates()
  {
    console.log("clicked");
    this.router.navigate(["candidates"]);
  }
  showError()
  {
    if(this.elections.getHasVoted())
    {
      this.snackbar.setMessage("You have already voted");
    }
    this.snackbar.startSnackBar();
  }

}


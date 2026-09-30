import { Component, input, AfterViewInit, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BallotBoxService } from '../../services/ballotBox.service';
import { ElectionService } from '../../services/election.service';
import { PropertyService } from '../../services/property.service';
import { UiIcon } from '../ui-icon/ui-icon';
import { UiButton } from "../ui-button/ui-button";
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'uiBallotBox',
  imports: [
    UiIcon,
    UiButton
  ],
  templateUrl: './ballot-box.html',
  styleUrl: './ballot-box.css',
})
export class BallotBox {
  constructor(private router: Router) {

  }

  snackbar = inject(SnackbarService);
  elections = inject(ElectionService);
  ballotBox = inject(BallotBoxService);
  property = inject(PropertyService);

  goToCandidates() {
    this.router.navigate(["candidates"]);
  }
  showError() {
    if (this.elections.getHasVoted()) {
      this.snackbar.setMessage("You have already voted");
    }
    this.snackbar.startSnackBar();
  }

}


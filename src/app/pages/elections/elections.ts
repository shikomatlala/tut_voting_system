import { Component,inject, OnInit,signal } from '@angular/core';
import { BallotBox } from "../../components/ballot-box/ballot-box";
import { ElectionService } from '../../services/election.service';
import { BallotBoxService } from '../../services/ballotBox.service';
import { UiTopNav } from '../../components/ui-top-nav/ui-top-nav';
import { UiSideNav } from '../../components/ui-side-nav/ui-side-nav';
import { UiContentSection } from '../../components/ui-content-section/ui-content-section';

@Component({
  selector: 'app-elections',
  imports: [BallotBox, UiTopNav, UiSideNav, UiContentSection],
  templateUrl: './elections.html',
  styleUrl: './elections.css',
})
export class Elections implements OnInit{

  electionService = inject(ElectionService);
  ballotBox = inject(BallotBoxService);


  ngOnInit(): void {
    this.electionService.getVote().subscribe();
  }


}

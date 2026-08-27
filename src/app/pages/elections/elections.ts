import { Component,inject, OnInit,signal } from '@angular/core';
import { BallotBox } from "../../components/ballot-box/ballot-box";
import { ElectionService } from '../../services/election.service';
import { LogoutComponent } from "../../components/logout-component/logout-component";
import { BallotBoxService } from '../../services/ballotBox.service';

@Component({
  selector: 'app-elections',
  imports: [BallotBox, LogoutComponent],
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

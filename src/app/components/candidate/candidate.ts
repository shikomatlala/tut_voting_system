import { Component, input, inject } from '@angular/core';
import { CandidateInterface } from '../../Interfaces/candidate.interface';
import { CandidateService } from '../../services/candidate.service';
import { ElectionService } from '../../services/election.service';
import { UiButton } from '../ui-button/ui-button';
import { Icon } from '../icon/icon';

@Component({
  selector: 'uiCandidate',
  imports: [
    UiButton,
    Icon
  ],
  templateUrl: './candidate.html',
  styleUrl: './candidate.css',
})
export class Candidate {
  candidate = input.required<CandidateService>();
  election = inject(ElectionService);

  onSubmit(candidateId:number)
  {
    this.election.voteForCandidate(candidateId).subscribe((result:any)=>{
      console.log(result);
    });
  }

  getRamdonPicture() : string
  {
   return `https://avatars.githubusercontent.com/u/525${Math.floor(Math.random() * (999 - 1) + 2)}?v=4&size=150`;
  }

}

import { Component, input, inject } from '@angular/core';
import { CandidateInterface } from '../../Interfaces/candidate.interface';
import { CandidateService } from '../../services/candidate.service';
import { ElectionService } from '../../services/election.service';

@Component({
  selector: 'uiCandidate',
  imports: [],
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

}

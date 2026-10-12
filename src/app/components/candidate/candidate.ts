import { Component, input, inject } from '@angular/core';
import { CandidateInterface } from '../../Interfaces/candidate.interface';
import { CandidateService } from '../../services/candidate.service';
import { ElectionService } from '../../services/election.service';
import { UiButton } from '../ui-button/ui-button';
import { UIDialogService } from '../../services/ui-dialog.service';

@Component({
  selector: 'uiCandidate',
  imports: [
    UiButton,
  ],
  templateUrl: './candidate.html',
  styleUrl: './candidate.css',
})
export class Candidate {
  candidate = input.required<CandidateService>();
  private uiDialogService = inject(UIDialogService);
  election = inject(ElectionService);

  onSubmit(candidateId: number, candidateFullName: string) {
    this.uiDialogService.setTitle("Are you sure?");
    this.uiDialogService.setMessage(`You are about to vote for ${candidateFullName}, this action is final and your vote will be complete`);
    this.uiDialogService.showModal();
    this.uiDialogService.onConfirmEvent$.subscribe(data =>{
      if(data == true)
      {
        this.election.voteForCandidate(candidateId).subscribe();
      }
    })
  }

  getRamdonPicture(): string {
    return `https://avatars.githubusercontent.com/u/525${Math.floor(Math.random() * (999 - 1) + 2)}?v=4&size=150`;
  }

}

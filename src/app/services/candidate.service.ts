
import { HttpClient } from "@angular/common/http";
import { Injectable, Inject, inject, InjectionToken, signal } from "@angular/core";
import { map, finalize, catchError, Observable, of } from "rxjs";
import { LoaderService } from "./loader.service";
import { URL } from "../global/url.variable";
import { SnackbarService } from "./snackbar.service";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { CandidateInterface } from "../Interfaces/candidate.interface";
import { ElectionService } from "./election.service";

export const CANDIDATE_TOKEN: CandidateInterface = {

  firstName : "",
  lastName : "",
  sex : "",
  year : 0,
  campaignTitle : "",
  campaignMessage : "",
  candidateStatus : "",
  ballotBoxId : 0,
  id :0
}

@Injectable({providedIn: "root"})
export class CandidateService
{

  private firstName = signal<string>("");
  private lastName = signal<string>("");
  private sex = signal<string>("");
  private year = signal<number>(0);
  private campaignTitle = signal<string>("");
  private campaignMessage = signal<string>("");
  private candidateStatus = signal<string>("");
  private ballotBoxId = signal<number>(0);
  private id = signal<number>(0);

  constructor()
  {

  }
    setCandidate(candidate:CandidateInterface)
    {
      this.setId(candidate.id);
      this.setFirstName(candidate.firstName);
      this.setLastName(candidate.lastName);
      this.setSex(candidate.sex);
      this.setYear(candidate.year);
      this.setCampaignTitle(candidate.campaignTitle);
      this.setCampaignMessage(candidate.campaignMessage);
      this.setCandidateStatus(candidate.candidateStatus);
      this.setBallotBoxId(candidate.ballotBoxId);
    }

    setFirstName(value:string)
    {
        this.firstName.set(value);
    }
    setLastName(value:string)
    {
        this.lastName.set(value);
    }
    setSex(value:string)
    {
        this.sex.set(value);
    }
    setYear(value:number)
    {
        this.year.set(value);
    }
    setCampaignTitle(value:string)
    {
        this.campaignTitle.set(value);
    }
    setCampaignMessage(value:string)
    {
        this.campaignMessage.set(value);
    }
    setCandidateStatus(value:string)
    {
        this.candidateStatus.set(value);
    }
    setBallotBoxId(value:number)
    {
        this.ballotBoxId.set(value);
    }
    setId(value: number)
    {
        this.id.set(value);
    }

    getCandidate()
    {
        return {
            firstName: this.getFirstName(),
            lastName: this.getLastName(),
            sex: this.getSex(),
            year: this.getYear(),
            campaignTitle: this.getCampaignTitle(),
            campaignMessage: this.getCampaignMessage(),
            candidateStatus: this.getCandidateStatus(),
            ballotBoxId: this.getBallotBoxId(),
            id: this.getId(),
        }
    }

    getFirstName()
    {
        return this.firstName();
    }
    getLastName()
    {
        return this.lastName();
    }
    getSex()
    {
        return this.sex();
    }
    getYear()
    {
        return this.year();
    }
    getCampaignTitle()
    {
        return this.campaignTitle();
    }
    getCampaignMessage()
    {
        return this.campaignMessage();
    }
    getCandidateStatus()
    {
        return this.candidateStatus();
    }
    getBallotBoxId()
    {
        return this.ballotBoxId();
    }
    getId()
    {
        return this.id();
    }


}

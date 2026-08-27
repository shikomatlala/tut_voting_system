

import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { StudentSessionService } from "./studentSession.service";
import { map, finalize, catchError, Observable, of } from "rxjs";
import { LoaderService } from "./loader.service";
import { URL } from "../global/url.variable";
import { SnackbarService } from "./snackbar.service";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { BallotBoxService } from "./ballotBox.service";
import { PropertyService } from "./property.service";


@Injectable({ providedIn: "root" })
export class ElectionService {
  constructor() {

  }
  //-----------------------------------
  // **** INJECTED SERVICES ****
  //-----------------------------------
  private snackbarService = inject(SnackbarService);
  private studentSessionService = inject(StudentSessionService);
  private loaderService = inject(LoaderService);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private ballotBox = inject(BallotBoxService);
  private property = inject(PropertyService);


  //-----------------------------------
  // **** CLASS MEMBER VARIABLES ****
  //-----------------------------------
  private studentPropertyId = signal<number>(0);
  private voteId = signal<number>(0);
  private propertyId = signal<number>(0);
  private hasVoted = signal<boolean>(false);
  private ballotBoxId = signal<number>(0);
  private hasStartedTheVote = signal<boolean>(false);
  private hasCompletedTheVote = signal<boolean>(false);
  private timeBallotBoxWasOpened = signal<Date>( new Date());
  private timeBallotBoxWasClosed = signal<Date>(new Date());
  private year = signal<string>("");

  //-----------------------------------
  // **** CONSTANT VARIABLES ****
  //-----------------------------------
  private url = URL + "/student/vote";

  getYear()
  {
    return this.year();
  }
  getHasStartedTheVote()
  {
    return this.hasStartedTheVote();
  }

  getStudentPropertyId()
  {
    return this.studentPropertyId();
  }
  getTimeBallotBoxWasOpened()
  {
    return this.timeBallotBoxWasOpened();
  }
  getTimeBallotBoxWasClosed()
  {
    return this.timeBallotBoxWasClosed();
  }
  getHasVoted() {
    return this.hasVoted();
  }
  getBallotBoxId() {
    return this.ballotBoxId();
  }
  getHasCompletedTheVote()
  {
    return this.hasCompletedTheVote();
  }


  getVoteData() {
    return {

      hasVoted: this.getHasVoted(),
      ballotBoxId: this.getBallotBoxId(),
      hasStartedTheVote: this.getHasStartedTheVote(),
      hasCompletedTheVote: this.getHasCompletedTheVote(),

    }
  }

  voteForCandidate(candidateId:number) : Observable<any>
  {
    console.log(this.studentPropertyId());
    const data = {
      candidateId: candidateId,
      studentPropertyId: this.studentPropertyId()
    }
    this.loaderService.startLoader();
    this.snackbarService.stopSnackBar();
    return this.http
      .post(this.url + "/cast-vote" + this.studentSessionService.getSessionURLQuery(), data)
      .pipe(
        map((response:any)=>{
          console.log(response);
        }),
        catchError((err:any)=>{
          console.log(err);
          return of(err);
        }),
        finalize(()=>{

        })
      )

  }

  getVote(): Observable<any> {
    this.loaderService.startLoader();
    this.snackbarService.stopSnackBar();
    this.loaderService.startLoader();
    return this.http
      .get(this.url + this.studentSessionService.getSessionURLQuery())
      .pipe(
        map((response: any) => {
          this.snackbarService.setMessage(response.message);
          if (response.data.election !== undefined) {
            //-------------------------------------------------------
            // SET ELECTIONS DATA
            //-------------------------------------------------------
            const election = response.data.election;
            this.voteId.set(election.vote_id);
            this.studentPropertyId.set(election.student_property_id);
            this.year.set(election.year);
            this.propertyId.set(election.property.id);
            this.ballotBoxId.set(election.ballot_box.id);
            this.hasStartedTheVote.set(election.has_start_the_vote == 1 ? true : false);
            this.hasCompletedTheVote.set(election.has_completed_the_vote == 1 ? true : false);
            this.hasVoted.set(election.has_voted == 1 ? true : false);
            this.ballotBoxId.set(election.ballot_box.id);
            this.studentPropertyId.set(election.student_property_id)
            //-------------------------------------------------------
            // SET PROPERTY DATA
            //-------------------------------------------------------
            const propertyData = election.property;
            this.property.setCampusCode(propertyData.campus_code);
            this.property.setPropertyCategory(propertyData.property_category);
            this.property.setId(propertyData.id);
            this.property.setPropertyName(propertyData.property_name);
            //-------------------------------------------------------
            // SET BALLOT BOX DATA
            //-------------------------------------------------------
            const ballotBox = election.ballot_box;
            console.log("ELECTION", election);
            this.ballotBox.setPropertyId(ballotBox.property_id);
            this.ballotBox.setBallotBoxName(ballotBox.ballot_box_name);
            this.ballotBox.setElectionYear(ballotBox.election_year);
            this.ballotBox.setEndDate( new Date(ballotBox.end_date));
            this.ballotBox.setStartDate(new Date(ballotBox.start_date));
            this.ballotBox.setId(ballotBox.id);
            this.ballotBox.setIsOpen(ballotBox.is_open);

            this.hasCompletedTheVote = election.has_completed_the_vote;
            for(var candidate of election.ballot_box.candidates)
            {
              this.ballotBox.addCandidate({
                  firstName: candidate.personal_details.first_name,
                  lastName: candidate.personal_details.last_name,
                  sex: candidate.personal_details.sex,
                  year: candidate.year,
                  campaignTitle: candidate.campaign_title,
                  campaignMessage: candidate.campaign_message,
                  candidateStatus: candidate.candidate_status,
                  ballotBoxId: candidate.ballot_box_id,
                  id: candidate.id
                });
            }
            return of("success");
          }
          else {
            this.router.navigate(['login']);
            this.snackbarService.setMessage("Please login first");
            return of("Please login first");
          }

        }),
        catchError((err: any) => {
          if (err.error) {
            console.log("ERROR", err.error);
            this.snackbarService.setMessage(err.error.message);
            this.router.navigate(['login']);
            return of(err.error.message);
          }
          else {
            console.log(err);
            this.snackbarService.setMessage("An error occured, please refresh the page");
          }
          return of(err);
        }),
        finalize(() => {
          this.loaderService.stopLoader();
          this.snackbarService.startSnackBar();
        })
      )
  }

}








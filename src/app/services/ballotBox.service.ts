import { Injectable,signal, inject } from "@angular/core";
import { CandidateService } from "./candidate.service";
import { CandidateInterface } from "../Interfaces/candidate.interface";



@Injectable({ providedIn: "root" })
export class BallotBoxService {

  protected id = signal<number>(0);
  protected studentPropertyId = signal<number>(0);
  protected propertyId = signal<number>(0);
  protected electionYear = signal<number>(0);
  protected startDate = signal<Date>(new Date());
  protected endDate = signal<Date>(new Date());
  protected isOpen = signal<boolean>(false);
  protected ballotBoxName = signal<string>("");
  protected candidates : Array<CandidateService> = (new Array());

  addCandidate(candidate: CandidateInterface)
  {
    const candidateService = new CandidateService();
    candidateService.setCandidate(candidate);
    this.candidates.push(candidateService);
  }
  getCandidatesCount()
  {
    return this.candidates.length;
  }
  getCandidates() : Array<CandidateService>
  {
    return this.candidates;
  }
  getBallotBox() {
    return {
      id: this.id(),
      studentPropertyId: this.studentPropertyId(),
      propertyId: this.propertyId(),
      startDate: this.startDate(),
      endDate: this.endDate(),
      isOpen: this.isOpen(),
      ballotBoxName: this.ballotBoxName(),
      totalCandidates: this.candidates.length,
      candidates: this.getCandidates()
    }
  }
  // ------------------------------
  //SETTERS
  //-------------------------------
  setId(value: number) {
    this.id.set(value);
  }
  setStudentPropertyId(value: number) {
    this.studentPropertyId.set(value);
  }
  setPropertyId(value: number) {
    this.propertyId.set(value);
  }
  setElectionYear(value: number) {
    this.electionYear.set(value);
  }
  setStartDate(value: Date) {
    this.startDate.set(value);
  }
  setEndDate(value: Date) {
    this.endDate.set(value);
  }
  setIsOpen(value: boolean) {
    this.isOpen.set(value);
  }
  setBallotBoxName(value: string) {
    this.ballotBoxName.set(value);
  }

//-----------------------------------
// -------- GETTERS ----------------
//-----------------------------------
  getId()
  {
    return this.id();
  }
  getStudentPropertyId()
  {
    return this.studentPropertyId();
  }
  getPropertyId()
  {
    return this.propertyId();
  }
  getElectionYear()
  {
    return this.electionYear();
  }
  getStartDate()
  {
    return this.startDate();
  }
  getEndDate()
  {
    return this.endDate();
  }
  getIsOpen()
  {
    return this.isOpen();
  }
  getBallotBoxName()
  {
    return this.ballotBoxName();
  }

}

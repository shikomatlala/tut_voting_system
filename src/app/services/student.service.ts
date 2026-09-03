import { Injectable, signal } from "@angular/core";



@Injectable({providedIn: "root"})
export class StudentService
{
  private studentNumber = signal<string>("");
  private id = signal<number>(0);
  private emailAddress = signal<string>("");
  private firstName = signal<string>("");
  private lastName = signal<string>("");

  setStudent()
  {
    return {
      studentNumber: this.getStudentNumber(),
      id: this.getId(),
      emailAddress: this.getEmailAddress(),
      firstName: this.getFirstName(),
      lastName: this.getLastName()
    }
  }
  setId(value: number)
  {
     this.id.set(value);
  }
  setEmailAddress(value:string)
  {
     this.emailAddress.set(value);
  }
  setFirstName(value:string)
  {
     this.firstName.set(value);
  }
  setLastName(value:string)
  {
     this.lastName.set(value);
  }
  setStudentNumber(value:string)
  {
    this.studentNumber.set(value);
  }
  getId()
  {
    return this.id();
  }
  getEmailAddress()
  {
    return this.emailAddress();
  }
  getFirstName()
  {
    return this.firstName();
  }
  getLastName()
  {
    return this.lastName();
  }
  getStudentNumber()
  {
    return this.studentNumber();
  }
}

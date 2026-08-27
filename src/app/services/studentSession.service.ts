import { Injectable, signal } from "@angular/core";


@Injectable({providedIn: "root"})
export class StudentSessionService
{
  private sessionName = signal<string>("");
  private sessionKey = signal<string>("");
  private sessionStatus = signal<boolean>(false);
  private isPageRefreshed = signal<boolean>(false);
  private isLoggedIn:boolean = false;
  private isLoginAttempted:boolean = false;
  private isOTPSent:boolean = false;

  clearSession()
  {
    this.sessionName.set("");
    this.sessionKey.set("");
    this.sessionStatus.set(false);
    this.isPageRefreshed.set(false);
    this.isLoggedIn = false;
    this.isLoginAttempted = false;
    this.isOTPSent = false;
  }
  getIsOTPSent():boolean
  {
    return this.isOTPSent;
  }

  getIsLoggedIn()
  {
    //-------------------------------------------------
    // CHEKC IF THE LOCAL VARIABLE HAS BEEN SET
    // It is important to do this, because if we loose the variable data we can
    // always get the same data from the localStorage.
    // We need to figure out the variables that cause our data to be lost.
    //-------------------------------------------------
    // const isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");
    // if(isLoggedInLocalStorage)
    // {
    //   return JSON.parse(isLoggedInLocalStorage);
    // }
    return this.isLoggedIn;
  }

  getIsLoginAttempted():boolean
  {
    return this.isLoginAttempted;
  }

  setIsLoggedIn(isLoggedIn:boolean)
  {
    //Set LocalStorage
    // localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    this.isLoggedIn = isLoggedIn;
  }
  setIsLoginAttempted(value:boolean)
  {
    this.isLoginAttempted = value;
  }
  setIsOTPSent(isOTPSent:boolean)
  {
    this.isOTPSent = isOTPSent;
  }

  setSessionStatus(value:boolean)
  {
    this.sessionStatus.set(value);
  }
  getSessionStatus():boolean
  {
    return this.sessionStatus();
  }
  getSessionName()
  {
    const studentSessionRaw = localStorage.getItem("studentSession");
    if(studentSessionRaw)
    {
      const studentSession = JSON.parse(studentSessionRaw);
      return studentSession.sessionName;
    }
    return this.sessionName();
  }
  setSessionName(value: string)
  {
    this.sessionName.set(value);
  }
  getSessionKey()
  {
    const studentSessionRaw = localStorage.getItem("studentSession");

    if(studentSessionRaw)
    {
      const studentSession = JSON.parse(studentSessionRaw);
      return studentSession.sessionKey;
    }
    return this.sessionKey();
  }
  setSessionKey(value: string)
  {
    this.sessionKey.set(value);
  }
  saveToLocalStorage()
  {

    localStorage.setItem("studentSession", JSON.stringify(this.getStudentSession()));
  }
  getSessionURLQuery()
  {
    return `?sessionName=${this.getSessionName()}&sessionKey=${this.getSessionKey()}`;
  }
  retrieveSessionObject()
  {
    const studentSessionRaw = localStorage.getItem("studentSession");
    if(studentSessionRaw)
    {
      const studentSession = JSON.parse(studentSessionRaw);
      this.setSessionKey(studentSession.sessionKey);
      this.setSessionName(studentSession.sessionName);
      return this.getStudentSession();
    }
    return this.getStudentSession();
  }


  clearLocalStorage()
  {
    // localStorage.clear();
  }


  getStudentSession()
  {
    return {
      sessionName: this.sessionName(),
      sessionKey: this.sessionKey(),
      sessionStatus: this.sessionStatus(),
      isPageRefreshed: this.isPageRefreshed(),
      isLoggedIn: this.isLoggedIn,
      isLoginAttempted: this.isLoginAttempted,
      isOTPSent: this.isOTPSent,
    }
  }

}





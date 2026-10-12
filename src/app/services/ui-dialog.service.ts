import { Injectable, signal } from "@angular/core";
import { Subject, pipe, map, finalize } from "rxjs";

@Injectable({providedIn: "root"})
export class UIDialogService
{
  private uIDialogTitle = signal<string>("Are you sure?");
  private uIDialogMessage = signal<string>("This action cannot be undone.");
  private response = signal<boolean>(false);
  private isShowingModal = signal<boolean>(false);
  private rxjsEventSubject = new Subject<boolean>();
  public onConfirmEvent$ = this.rxjsEventSubject.asObservable();

  getIsShowingModal():boolean
  {
    return this.isShowingModal();
  }



  confirm(data:boolean) : void
  {
    //------------------------------------
    // 1. Set Dialog Box Title & Message (optional)
    // 2. Open Dialog Box
    // 3. Listen to the user selected choice
    // 4. Return the response
    // 5. Close the Dialog Box
    //------------------------------------
    this.setResponse(data);
    this.rxjsEventSubject.next(data);
    this.isShowingModal.set(false);
  }

  setTitle(title: string) : void
  {
    this.uIDialogTitle.set(title);
  }
  getTitle():string
  {
    return this.uIDialogTitle();
  }
  setMessage(message: string) : void
  {
    this.uIDialogMessage.set(message);
  }
  getMessage():string
  {
    return this.uIDialogMessage();
  }
  hideModal(): void
  {
    this.isShowingModal.set(false);
  }
  showModal():void
  {
    this.isShowingModal.set(true);
  }
  setResponse(responseValue: boolean):void
  {
    this.response.set(responseValue);
  }
  getResponse():boolean
  {
    return this.response();
  }

}

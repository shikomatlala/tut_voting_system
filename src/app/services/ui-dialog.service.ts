import { Injectable, signal } from "@angular/core";

@Injectable({providedIn: "root"})
export class UIDialogService
{
  private uIDialogTitle = signal<string>("Are you sure?");
  private uIDialogMessage = signal<string>("This action cannot be undone.");
  private response = signal<boolean>(false);
  private isShowingModal = signal<boolean>(false);

  getIsShowingModal():boolean
  {
    return this.isShowingModal();
  }

  setTitle(title: string) : void
  {
    this.uIDialogTitle.set(title);
  }
  setMessage(message: string) : void
  {
    this.uIDialogMessage.set(message);
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

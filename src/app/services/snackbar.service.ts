import { Injectable, signal, WritableSignal } from "@angular/core";


@Injectable({providedIn:"root"})
export class SnackbarService
{
  private message = signal<string>("success");
  private isShowing = signal<boolean>(false);
  private timerId:number = 0;


  setMessage(message:string):void
  {
    this.message.set(message);
  }

  getMessage(): string
  {
    return this.message();
  }

  getIsShowing():boolean
  {
    return this.isShowing();
  }
  setIsShowing(isShowing:boolean)
  {
    this.isShowing.set(isShowing);
  }
  startSnackBar()
  {
    clearTimeout(this.timerId);
    this.isShowing.set(true);
    this.timerId = setTimeout(()=>{
      this.stopSnackBar();
    },7000)
  }
  stopSnackBar()
  {
    this.isShowing.set(false);
    this.message.set("success");
  }
}

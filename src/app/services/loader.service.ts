
import { Service, inject, Injectable,signal, Signal } from "@angular/core";

@Injectable({providedIn: "root"})
export class LoaderService
{

  private isLoading = signal<boolean>(false);
  private message:string = "loading...";

  setMessage(message:string)
  {
    this.message = message;
  }
  getMessage()
  {
    return this.message;
  }
  startLoader()
  {
    this.isLoading.update(()=>true);
  }
  getLoaderStatus(): any
  {
    return this.isLoading();
  }

  stopLoader()
  {
    this.isLoading.set(false);
  }


}

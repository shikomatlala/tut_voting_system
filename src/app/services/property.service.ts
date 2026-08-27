import { Injectable, signal } from "@angular/core"



@Injectable({providedIn: "root"})
export class PropertyService
{
  private campusCode = signal<string>("");
  private id = signal<number>(0);
  private propertyCategory = signal<string>("");
  private propertyName = signal<string>("");

  constructor()
  {

  }

  getProperty()
  {
    return {
      campusCode: this.getCampusCode(),
      id: this.getId(),
      propertyCategory: this.getPropertyCategory(),
      propertyName: this.getPropertyName(),

    }
  }

  //------------------
  ///SETTERS & GETTERS
  //------------------
  setCampusCode(value:string)
  {
    this.campusCode.set(value);
  }
  setId(value:number)
  {
    this.id.set(value);
  }
  setPropertyCategory(value:string)
  {
    this.propertyCategory.set(value);
  }
  setPropertyName(value:string)
  {
    this.propertyName.set(value);
  }


  getCampusCode()
  {
    return this.campusCode();
  }
  getId()
  {
    return this.id();
  }
  getPropertyCategory()
  {
    return this.propertyCategory();
  }
  getPropertyName()
  {
    return this.propertyName();
  }




}

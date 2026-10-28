import { Injectable, signal } from "@angular/core";
import { TableDensityInterface } from "../Interfaces/tableDensity.inerface";
import { TableLayoutInterface } from "../Interfaces/tableLayout.interface";

@Injectable({providedIn: "root"})
export class TableLayoutControlService
{
  private tableDensity  = signal<Array<TableDensityInterface>>([{margin:"10px", padding:"10px", name: "medium", iconCode: "densityMedium", isActive: true, }, {margin:"0px", padding:"0px", name: "small", iconCode: "densitySmall", isActive: false, }]);
  private tableLayout= signal<Array<TableLayoutInterface>>([{ name: "split", isActive: true, }, { name: "unsplit", isActive: false, }]);
  private currentTableDensity = signal<TableDensityInterface>(this.tableDensity()[0]);
  private currentTableLayout = signal<TableLayoutInterface>(this.tableLayout()[0]);
  public activeDensity = signal<TableDensityInterface>(this.tableDensity()[0]);
  private layout = signal<string>("unsplit");


  getLayout(): string
  {
    return this.layout();
  }


  toggleTableLayout() : void
  {

    if(this.layout() == "unsplit")
    {
      this.layout.set("split");
    }
    else
    {
      this.layout.set("unsplit");
    }
  }

  getCurrentLayout() : TableLayoutInterface
  {
    return this.currentTableLayout();
  }
  getCurrentTableDensity() : TableDensityInterface
  {
    return this.currentTableDensity();
  }
  setCurrentTableLayout(layoutName:string) :void
  {
    this.currentTableLayout.set(this.tableLayout()[0]);
    for(let x = 0; x < this.tableLayout().length; x++)
    {
      if(this.tableLayout()[x].name == layoutName)
      {
        this.tableLayout()[x].isActive = false;
        this.currentTableLayout.set(this.tableLayout()[x]);
        break;
      }
    }
  }

  resetTableLayout() : void
  {
    for(let x = 0; x < this.tableLayout().length; x++)
    {
      this.tableLayout()[x].isActive = false;
    }
  }

  toggleTableDensity():void
  {
    for(let x = 0; x < this.tableDensity().length; x++)
    {
      //set current density to false
      if(this.tableDensity()[x].isActive)
      {
        //Get the currnt tableDensity and set is to false
        this.tableDensity.update(density => {density[x].isActive = false; return density})
        //check if the position of this current density + 1 is equal to the length of the array
        if(x + 1 >= this.tableDensity().length)
        {
          //If they are greater then go the first density and set its active status to true
          this.tableDensity.update(density => {density[0].isActive = true; return density});
          this.activeDensity.set(this.tableDensity()[0]);
          break;
        }
        else
        {
          //Set the next density to true
          this.tableDensity.update(density => {density[x+1].isActive = true; return density});
          this.activeDensity.set(this.tableDensity()[x+1]);
          break;
        }
      }
      //Set the next density to true
      // if(this.tableDensity()[x].c)
    }
  }
  setCurrentTableDensity(densityName:string) :void
  {
    this.currentTableDensity.set(this.tableDensity()[0]);
    for(let x = 0; x < this.tableDensity().length; x++)
    {
      if(this.tableDensity()[x].name == densityName)
      {
        this.tableDensity()[x].isActive = false;
        this.currentTableDensity.set(this.tableDensity()[x]);
        break;
      }
    }
  }

  resetTableDensities() : void
  {
    for(let x = 0; x < this.tableDensity().length; x++)
    {
      this.tableDensity()[x].isActive = false;
    }
  }


  getActiveDensity():TableDensityInterface
  {
    for(let density of this.tableDensity())
    {
      if(density.isActive)
      {
        console.log(density);
        return density;
      }
    }
    return this.tableDensity()[0];
  }
  getTableDensities():Array<TableDensityInterface>
  {
    return this.tableDensity();
  }
}

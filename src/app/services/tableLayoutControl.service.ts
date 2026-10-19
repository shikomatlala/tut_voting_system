import { Injectable, signal } from "@angular/core";
import { TableDensityInterface } from "../Interfaces/tableDensity.inerface";
import { TableLayoutInterface } from "../Interfaces/tableLayout.interface";

@Injectable({providedIn: "root"})
export class TableLayoutControlService
{
  private tableDensity  = signal<Array<TableDensityInterface>>([{ name: "medium", iconCode: "densityMedium", isActive: true, }, { name: "small", iconCode: "densitySmall", isActive: false, }]);
  private tableLayout= signal<Array<TableLayoutInterface>>([{ name: "split", isActive: true, }, { name: "unsplit", isActive: false, }]);
  private currentTableDensity = signal<TableDensityInterface>(this.tableDensity()[0]);
  private currentTableLayout = signal<TableLayoutInterface>(this.tableLayout()[0]);
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

  getTableDensities():Array<TableDensityInterface>
  {
    return this.tableDensity();
  }
}

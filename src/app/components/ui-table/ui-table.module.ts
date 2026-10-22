import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UiTable } from "./ui-table";
import { UiTableData } from "./ui-table-data/ui-table-data";
import { UiTableRow } from "./ui-table-row/ui-table-row";
import { UiTableFoot } from "./ui-table-foot/ui-table-foot";

@NgModule({
  declarations: [
    UiTable,
    UiTableData,
    UiTableRow,
    UiTableFoot
  ],
  exports: [
    UiTable,
    UiTableData,
    UiTableRow,
    UiTableFoot
  ],
  imports: [
    CommonModule
  ]
})

export class UiTableModule
{

}

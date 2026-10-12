import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UiTable } from "./ui-table";
import { UiTableData } from "./ui-table-data/ui-table-data";
import { UiTableRow } from "./ui-table-row/ui-table-row";

@NgModule({
  declarations: [
    UiTable,
    UiTableData,
    UiTableRow
  ],
  exports: [
    UiTable,
    UiTableData,
    UiTableRow
  ],
  imports: [
    CommonModule
  ]
})

export class UiTableModule
{

}

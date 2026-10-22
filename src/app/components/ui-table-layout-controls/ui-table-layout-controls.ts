import { Component, inject} from '@angular/core';
import { UiButtonIcon } from '../ui-button-icon/ui-button-icon';
import { UiChipSet } from '../ui-chip-set/ui-chip-set';
import { TableLayoutControlService } from '../../services/tableLayoutControl.service';
@Component({
  selector: 'ui-table-layout-controls',
  imports: [UiButtonIcon, UiChipSet ],
  templateUrl: './ui-table-layout-controls.html',
  styleUrl: './ui-table-layout-controls.css',
})
export class UiTableLayoutControls {

  tableControlsService = inject(TableLayoutControlService);

}

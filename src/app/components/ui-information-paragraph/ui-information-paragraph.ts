import { Component, input } from '@angular/core';
import { UiIcon } from '../ui-icon/ui-icon';

@Component({
  selector: 'app-ui-information-paragraph',
  imports: [
    UiIcon
  ],
  templateUrl: './ui-information-paragraph.html',
  styleUrl: './ui-information-paragraph.css',
})
export class UiInformationParagraph {
  iconCode = input<string>("info");
  iconColor = input<string>("blue");
  title = input.required<string>();
  isTitleBold = input<boolean>(true);

}

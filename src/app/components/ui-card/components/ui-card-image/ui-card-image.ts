import { Component, input } from '@angular/core';

@Component({
  selector: 'div[ui-card-image]',
  standalone: false,
  templateUrl: './ui-card-image.html',
  styleUrl: './ui-card-image.css',
})
export class UiCardImage {

  imageSource = input.required<string>();

}

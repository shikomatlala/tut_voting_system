import { Component , input} from '@angular/core';

@Component({
  selector: 'ui-image',
  imports: [],
  templateUrl: './ui-image.html',
  styleUrl: './ui-image.css',
})
export class UiImage {
  src = input.required<string>();
  id = input<string>("image");
  alt = input<string>("image");
  name = input<string>("image");
  height = input<string>("250");
  width = input<string>("250");

}

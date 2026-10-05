import {
  Component,
  input,
  HostBinding,
  OnInit
 } from '@angular/core';

@Component({
  selector: 'div[ui-card]',
  standalone: false,
  templateUrl: './ui-card.html',
  styleUrl: './ui-card.css',
})
export class UiCard implements OnInit{
  backgroundColor = input<string>("");
  @HostBinding('style.backgroundColor') hostBackgroundColor: string = "";
  ngOnInit()
  {
    this.hostBackgroundColor = this.backgroundColor();
  }
}

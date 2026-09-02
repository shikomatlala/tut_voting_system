import {
  Component,
  input,
  HostBinding,
  OnInit
 } from '@angular/core';

@Component({
  selector: 'div[ui-card]',
  standalone: false,
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card implements OnInit{
  backgroundColor = input<string>("");
  @HostBinding('style.backgroundColor') hostBackgroundColor: string = "";
  ngOnInit()
  {
    this.hostBackgroundColor = this.backgroundColor();
  }
}

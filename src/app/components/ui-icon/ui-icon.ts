import { Component, input, OnInit, signal } from "@angular/core";
import { Icon } from "../../types/icon.type";
import { BLUE_FILLED_ICONS } from "../../constants/icon-constants/blue.filled.icons";
import { BLUE_UNFILLED_ICONS } from "../../constants/icon-constants/blue.unfilled.icons";
import { WHITE_FILLED_ICONS } from "../../constants/icon-constants/white.filled.icons";
import { WHITE_UNFILLED_ICONS } from "../../constants/icon-constants/white.unfilled.icons";
import { GREY_FILLED_ICONS } from "../../constants/icon-constants/grey.filled.icons";
import { GREY_UNFILLED_ICONS } from "../../constants/icon-constants/grey.unfilled.icons";

@Component({
  imports: [],
  selector: "ui-icon",
  styleUrl: "./ui-icon.css",
  templateUrl: "./ui-icon.html"
})
export class UiIcon implements OnInit {

  constructor()
  {
    this.isWindowLoaded.set(false);
  }

  readonly BROKEN_IMAGE_ICON: Icon = { color: "grey", state: "filled", code: "brokenImage", src: "assets/icons/filled/blue/brokenImage.svg", alt: "brokenImage icon"};

  code = input.required<string>();
  filled = input<boolean>(true);
  color = input.required<string>();
  width = input<string>("24");
  height = input<string>("24");

  isWindowLoaded = signal<boolean>(false);
  isImageLoaded = signal<boolean>(false);
  icons: Array<Icon> = new Array(this.BROKEN_IMAGE_ICON);
  isFound:boolean = false;
  icon:Icon = this.BROKEN_IMAGE_ICON;

  getIcon() : Icon
  {
    if(this.filled()) {
      switch(this.color()) {
        case "blue" : this.icons = BLUE_FILLED_ICONS; break;
        case "grey" : this.icons = GREY_FILLED_ICONS; break;
        case "white" : this.icons = WHITE_FILLED_ICONS; break;
        default : this.icons = new Array<Icon>(this.BROKEN_IMAGE_ICON);
      }
    }
    else {
      switch(this.color()) {
        case "blue" : this.icons = BLUE_UNFILLED_ICONS; break;
        case "grey" : this.icons = GREY_UNFILLED_ICONS; break;
        case "white" : this.icons = WHITE_UNFILLED_ICONS; break;
        default : this.icons = new Array<Icon>(this.BROKEN_IMAGE_ICON);
      }
    }
    this.icons.find(icon =>{
      if(icon.code === this.code()) {
        this.isFound = true;
        this.icon = icon;
      }
    })
    return this.icon;
  }

  ngOnInit(): void {
    this.getIcon();
  }

}


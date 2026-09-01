import { AfterViewInit, Component,input, OnInit, signal } from '@angular/core';
import { IconInterface } from '../../Interfaces/IconInterface.interface';
import { IconConstanctInterface } from '../../Interfaces/iconConstant.interface';
import { BLUE_ICONS } from '../../constants/icon-constants/blue.icons';
import { GREY_ICONS } from '../../constants/icon-constants/grey.icons';
import { LOGO_ICONS } from '../../constants/icon-constants/logo.icon';

@Component({
  selector: 'ui-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon  implements OnInit{

  //-----------------------------------------------------------------
  //---- Constructor ----
  //-----------------------------------------------------------------
  constructor()
  {

  }

  //-----------------------------------------------------------------
  //---- Read only constants----
  //-----------------------------------------------------------------
  readonly BLANK_ICON = { type: "", src: "", code: "" , alt: "" };
  readonly BLANK_ICON_OBJECT = { id :"", name :"", icon :"", src :"", alt :"", code :"", type :"", height :"", width :"" };

  //-----------------------------------------------------------------
  //---- Input Properties ----
  //-----------------------------------------------------------------
  hasBorderRadius = input<boolean>(false);
  id = input<string>("icon");
  name = input<string>("");
  src = input<string>("");
  alt = input<string>("");
  code = input<string>("");
  type = input<string>("grey");
  height = input<string>("24");
  width = input<string>("24");
  attributes = input<IconInterface>();

  //-----------------------------------------------------------------
  //---- ICON PROPERTIES ----
  //-----------------------------------------------------------------
  iconList : Array<IconConstanctInterface>  = new Array(this.BLANK_ICON);
  isIconFound : boolean = false;
  iconObject: IconConstanctInterface = this.BLANK_ICON;

  //-----------------------------------------------------------------
  //---- ICON METHODS----
  //-----------------------------------------------------------------
  getIcon() : IconConstanctInterface
  {
    //-----------------------------------------------------------------
    // ** Get the list containing the this icon. **
    //-----------------------------------------------------------------
    switch(this.type())
    {
      case "logo"           : this.iconList = LOGO_ICONS;
        break;
      case "blue"           : this.iconList = BLUE_ICONS;
        break;
      case "grey"           : this.iconList = GREY_ICONS;
        break;
      default               : this.iconList = [ this.BLANK_ICON];
    }

    //-----------------------------------------------------------------
    // ** Search this icon in the list. **
    //-----------------------------------------------------------------
    this.iconList.find(icon =>{
      if(icon.code === this.code())
      {
        this.isIconFound = true;
        this.iconObject = icon;
      }
    });
    return this.iconObject;
  }
  ngOnInit(): void {
    //-----------------------------------------------------------------
    // ** set the icon. **
    //-----------------------------------------------------------------
    this.getIcon();
  }

}



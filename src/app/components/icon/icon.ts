import { Component,input } from '@angular/core';
import { IconInterface } from '../../Interfaces/IconInterface.interface';

@Component({
  selector: 'uiIcon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon implements IconInterface {

  //================================
  //---- ICON PROPERTIES ----
  //================================
  constructor()
  {
  }
  defaultIcon : IconInterface = {
    id: "",
    name: "",
    icon: "",
    src: "",
    alt: "Unknown Icon",
    code: "",
    type: "",
    height: "",
    width: ""
  }
  //================================
  //---- ICON PROPERTIES ----
  //================================
  attributes = input.required<IconInterface>();
  id =  "image";
  name =  "image";
  icon = "";
  src =  "";
  alt =  "Unknown Icon";
  code =  "";
  type =  "";
  height =  "24px";
  width =  "24px";

  hasBorderRadius = input<boolean>(false); //These are setters and getters
  iconObject:IconInterface = this.defaultIcon;
  isIconFound: boolean = false;

  //================================
  //---- ICON METHODS----
  //================================
  get Icon() : IconInterface
  {
    return this.defaultIcon;
  }

}



import { NgModule } from "@angular/core";
import { Card } from "./card";
import { CardActions } from "./components/card-actions/card-actions";
import { CardAvatar } from "./components/card-avatar/card-avatar";
import { CardColumnLayer } from "./components/card-column-layer/card-column-layer";
import { CardContainer } from "./components/card-container/card-container";
import { CardContent } from "./components/card-content/card-content";
import { CardFooter } from "./components/card-footer/card-footer";
import { CardHeader } from "./components/card-header/card-header";
import { CardHeaderSubtitle } from "./components/card-header-subtitle/card-header-subtitle";
import { CardHeaderTitle } from "./components/card-header-title/card-header-title";
import { CardHeaderTitleImage } from "./components/card-header-title-image/card-header-title-image";
import { CardIcon } from "./components/card-icon/card-icon";
import { CardImage } from "./components/card-image/card-image";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    Card,
    CardActions,
    CardAvatar,
    CardColumnLayer,
    CardContainer,
    CardContent,
    CardFooter,
    CardHeader,
    CardHeaderSubtitle,
    CardHeaderTitle,
    CardHeaderTitleImage,
    CardIcon,
    CardImage
  ],
  exports: [
    Card,
    CardActions,
    CardAvatar,
    CardColumnLayer,
    CardContainer,
    CardContent,
    CardFooter,
    CardHeader,
    CardHeaderSubtitle,
    CardHeaderTitle,
    CardHeaderTitleImage,
    CardIcon,
    CardImage
  ],
  imports: [
    CommonModule
  ]
})

export class CardModule
{

}

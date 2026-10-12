import { NgModule } from "@angular/core";
import { UiCard } from "./ui-card";
import { UiCardAvatar } from "./components/ui-card-avatar/ui-card-avatar";
import { UiCardColumnLayer } from "./components/ui-card-column-layer/ui-card-column-layer";
import { UiCardContainer } from "./components/ui-card-container/ui-card-container";
import { UiCardContent } from "./components/ui-card-content/ui-card-content";
import { UiCardFooter } from "./components/ui-card-footer/ui-card-footer";
import { UiCardHeader } from "./components/ui-card-header/ui-card-header";
import { UiCardHeaderSubtitle } from "./components/ui-card-header-subtitle/ui-card-header-subtitle";
import { UiCardHeaderTitle } from "./components/ui-card-header-title/ui-card-header-title";
import { UiCardHeaderTitleImage } from "./components/ui-card-header-title-image/ui-card-header-title-image";
import { UiCardIcon } from "./components/ui-card-icon/ui-card-icon";
import { UiCardImage } from "./components/ui-card-image/ui-card-image";
import { CommonModule } from "@angular/common";
import { UiCardActions } from "./components/ui-card-actions/ui-card-actions";
import { UiImage } from "../ui-image/ui-image";

@NgModule({
  declarations: [
    UiCard,
    UiCardActions,
    UiCardAvatar,
    UiCardColumnLayer,
    UiCardContainer,
    UiCardContent,
    UiCardFooter,
    UiCardHeader,
    UiCardHeaderSubtitle,
    UiCardHeaderTitle,
    UiCardHeaderTitleImage,
    UiCardIcon,
    UiCardImage
  ],
  exports: [
    UiCard,
    UiCardActions,
    UiCardAvatar,
    UiCardColumnLayer,
    UiCardContainer,
    UiCardContent,
    UiCardFooter,
    UiCardHeader,
    UiCardHeaderSubtitle,
    UiCardHeaderTitle,
    UiCardHeaderTitleImage,
    UiCardIcon,
    UiCardImage
  ],
  imports: [
    CommonModule,
    UiImage
]
})

export class UiCardModule
{

}

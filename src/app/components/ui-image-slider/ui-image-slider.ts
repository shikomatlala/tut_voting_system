import { Component, viewChild, ElementRef, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiIcon } from '../ui-icon/ui-icon';
import { ImageInterface } from '../../Interfaces/image.interface';
import { UiImage } from '../ui-image/ui-image';
import { UiButtonIcon } from '../ui-button-icon/ui-button-icon';

@Component({
  selector: 'ui-image-slider',
  imports: [
    FormsModule,
    UiImage,
    UiButtonIcon
],
  templateUrl: './ui-image-slider.html',
  styleUrl: './ui-image-slider.css',
})
export class UiImageSlider {

  private slideView = viewChild.required<ElementRef<HTMLImageElement>>('slideView');
  startIndex = input<number>(3);
  images = input.required<ImageInterface[]>();
  currentImageIndex = 0;
  currentImage: ImageInterface = {src: "", alt: ""};
  slideIndex = 0;

  arrowClickListener(event: Event)
  {
    const keyboardEvent = event as KeyboardEvent;
    if(keyboardEvent.code == "ArrowLeft" || keyboardEvent.code == "KeyH")
    {
      this.nextImage(-1);
    }

    if(keyboardEvent.code == "ArrowRight" || keyboardEvent.code == "KeyL")
    {
      this.nextImage(1);
    }
  }

  ngAfterViewInit() : void
  {
    if(this.startIndex() == 0)
    {
      this.currentImageIndex = 0;
      this.currentImage = this.images()[this.startIndex()];
      this.slideView().nativeElement.style.display = "block";
    }
  }

  nextImage(direction: any) : void
  {
    this.showSlides(this.currentImageIndex + direction);
  }

  currentSlide(slideNumber:number) : void
  {
    this.showSlides(slideNumber);
  }

  showSlides(newSlideNumber: number) : void
  {
    if(newSlideNumber >= 0 && newSlideNumber <= this.images().length -1)
    {
      this.currentImageIndex = newSlideNumber;
      this.slideView().nativeElement.src = this.images()[this.currentImageIndex].src;
    }
  }





}

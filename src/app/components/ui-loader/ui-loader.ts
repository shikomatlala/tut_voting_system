import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'ui-loader',
  templateUrl: './ui-loader.html',
  styleUrl: './ui-loader.css',
})
export class UiLoader {
  loaderService = inject(LoaderService);



}

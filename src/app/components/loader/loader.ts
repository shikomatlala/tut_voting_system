import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Icon } from "../icon/icon";

@Component({
  selector: 'ui-loader',
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  loaderService = inject(LoaderService);



}

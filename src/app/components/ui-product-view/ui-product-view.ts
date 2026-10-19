import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { UiCardModule } from '../ui-card/ui-card.module';
import { UiInputField } from '../ui-input-field/ui-input-field';
import { UiInput } from '../ui-input/ui-input';
import { FormsModule } from '@angular/forms';
import { UiInputLabel } from '../ui-input-label/ui-input-label';

@Component({
  selector: 'ui-product-view',
  imports: [UiCardModule, UiInputField, UiInput, FormsModule, UiInputLabel],
  templateUrl: './ui-product-view.html',
  styleUrl: './ui-product-view.css',
})
export class UiProductView {

  productService = inject(ProductService);


}

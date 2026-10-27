import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductListServicve } from '../../services/productList.service';
import { UiInput } from '../ui-input/ui-input';
import { UiTableModule } from '../ui-table/ui-table.module';
import { UiButton } from '../ui-button/ui-button';


@Component({
  selector: 'ui-add-product-table-row-style',
  imports: [
    ReactiveFormsModule,
    UiInput,
    UiTableModule,
    UiButton
],
  templateUrl: './ui-add-product-table-row-style.html',
  styleUrl: './ui-add-product-table-row-style.css',
})
export class UiAddProductTableRowStyle {
  productService = inject(ProductService);
  productListService = inject(ProductListServicve);


  productForm : FormGroup = new FormGroup(
    {
      name:  new FormControl(""),
      price_per_item:  new FormControl(0.0),
      price:  new FormControl(0.0),
      count:  new FormControl(1),
      seller:  new FormControl(""),
      purchase_date:  new FormControl(new Date()),
      product_type:  new FormControl(""),
      brand:  new FormControl("")
    }
  );

  addProduct( productForm: FormGroup)
  {
    let product = {
      product: productForm.value
    };
    this.productListService.addProduct(product).subscribe(()=>{
      this.productListService.getProductsFromServer().subscribe();
    });
  }

  clear(productForm: FormGroup)
  {
    console.log(productForm.value);
    this.productForm.reset();
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { UiTableModule } from '../ui-table/ui-table.module';
import { ProductListServicve } from '../../services/productList.service';
import { UiButton } from '../ui-button/ui-button';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { UiIcon } from '../ui-icon/ui-icon';
import { UiCardModule } from '../ui-card/ui-card.module';
import { UiInput } from '../ui-input/ui-input';
import { FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { UiForm } from '../ui-form/ui-form';
import { UiButtonIcon } from '../ui-button-icon/ui-button-icon';
import { UIDialogService } from '../../services/ui-dialog.service';
import { TableLayoutControlService } from '../../services/tableLayoutControl.service';
import { ProductInterface } from '../../Interfaces/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'ui-product-list-table',
  imports: [
    UiTableModule,
    UpperCasePipe,
    UiIcon,
    UiButton,
    UiCardModule,
    FormsModule,
    UiInput,
    ReactiveFormsModule,
    UiButtonIcon,
    DatePipe,
],
  templateUrl: './ui-product-list-table.html',
  styleUrl: './ui-product-list-table.css',
})
export class UiProductListTable implements OnInit {
  productService = inject(ProductService);
  uiTableLayoutControlService = inject(TableLayoutControlService);
  uiDialogService = inject(UIDialogService);
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
  deleteProduct(product:any)
  {
    this.uiDialogService.setTitle("Are you sure?");
    this.uiDialogService.setMessage(`You are about to delete <br><strong>${product.name}</strong><br> this action is final and cannot be undone.`);
    this.uiDialogService.showModal();
    this.uiDialogService.onConfirmEvent$.subscribe(data =>{
      if(data == true)
      {
        this.productListService.deleteProduct({id: product.id}).subscribe();
      }
    })

  }
  ngOnInit(): void {
    this.productListService.getProductsFromServer().subscribe();
    this.productForm = new FormGroup(
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
  }

  clear(productForm: FormGroup)
  {
    console.log(productForm.value);
    this.productForm.reset();
  }

  addProduct( productForm: FormGroup)
  {
    let product = {
      product: productForm.value
    };
    this.productListService.addProduct(product).subscribe(()=>{
      this.productListService.getProductsFromServer().subscribe();
    });
  }

  greet(product: ProductInterface)
  {
    console.log("You have selected" + product.name );
  }


}

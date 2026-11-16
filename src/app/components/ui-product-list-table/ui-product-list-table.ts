import { Component, ViewChild, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { UiTableModule } from '../ui-table/ui-table.module';
import { ProductListServicve } from '../../services/productList.service';
import { UiButton } from '../ui-button/ui-button';
import { CurrencyPipe, DatePipe, UpperCasePipe, NgStyle } from '@angular/common';
import { UiIcon } from '../ui-icon/ui-icon';
import { UiCardModule } from '../ui-card/ui-card.module';
import { UiInput } from '../ui-input/ui-input';
import { FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiForm } from '../ui-form/ui-form';
import { UiButtonIcon } from '../ui-button-icon/ui-button-icon';
import { UIDialogService } from '../../services/ui-dialog.service';
import { TableLayoutControlService } from '../../services/tableLayoutControl.service';
import { ProductInterface } from '../../Interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { UiPopover } from '../ui-popover/ui-popover';
import { UiProductView } from '../ui-product-view/ui-product-view';
import { SnackbarService } from '../../services/snackbar.service';
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
    DatePipe,
    CurrencyPipe,
    NgStyle,
    UiPopover,
    UiProductView
],
  templateUrl: './ui-product-list-table.html',
  styleUrl: './ui-product-list-table.css',
})
export class UiProductListTable implements OnInit {
  @ViewChild('inputName', {read: ElementRef}) productInputName! : ElementRef<HTMLInputElement>
  productService = inject(ProductService);
  uiTableLayoutControlService = inject(TableLayoutControlService);
  uiDialogService = inject(UIDialogService);
  uiSnackbar = inject(SnackbarService);
  productListService = inject(ProductListServicve);
  productForm : FormGroup = new FormGroup(
    {
      name:  new FormControl("", Validators.required),
      price_per_item:  new FormControl(0.0, Validators.required),
      price:  new FormControl(0.0, Validators.required),
      count:  new FormControl(1, Validators.required),
      seller:  new FormControl("", Validators.required),
      purchase_date:  new FormControl(new Date(), Validators.required),
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
        name:  new FormControl("", Validators.required),
        price_per_item:  new FormControl(0.0, Validators.required),
        price:  new FormControl(0.0, Validators.required),
        count:  new FormControl(1, Validators.required),
        seller:  new FormControl("", Validators.required),
        purchase_date:  new FormControl(new Date(), Validators.required),
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
    if(productForm.valid)
    {
      let product = {
        product: productForm.value
      };
      this.productListService.addProduct(product).subscribe(()=>{
        this.productListService.getProductsFromServer().subscribe(()=>{
          this.productInputName.nativeElement.value = "";
          this.productInputName.nativeElement.focus();
        });
      });
    }
    else
    {
      this.uiSnackbar.setMessage("Enter all missing required inputs to proceed");
      this.uiSnackbar.startSnackBar();

    }
  }

  greet(product: ProductInterface)
  {
    console.log("You have selected" + product.name );
  }


}



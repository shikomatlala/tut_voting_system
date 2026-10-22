import { Component, effect, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { UiCardModule } from '../ui-card/ui-card.module';
import { UiInputField } from '../ui-input-field/ui-input-field';
import { UiInput } from '../ui-input/ui-input';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { UiInputLabel } from '../ui-input-label/ui-input-label';
import { UiButton } from '../ui-button/ui-button';
import { UIDialogService } from '../../services/ui-dialog.service';
import { formatDate, NgClass } from '@angular/common';
import { UiForm } from '../ui-form/ui-form';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'ui-product-view',
  imports: [
    UiCardModule,
    UiInputField,
    UiInput,
    FormsModule,
    UiInputLabel,
    NgClass,
    UiButton,
    ReactiveFormsModule,
    UiForm,
],
  templateUrl: './ui-product-view.html',
  styleUrl: './ui-product-view.css',
})
export class UiProductView  {

  snackbar = inject(SnackbarService);
  uiDialogService = inject(UIDialogService);
  productService = inject(ProductService);
  productForm  = new FormGroup(
    {
      name : new FormControl(this.productService.getName()),
      brand : new FormControl(""),
      count : new FormControl(0),
      pricePerItem : new FormControl(0.0),
      price : new FormControl(0.0),
      seller : new FormControl(""),
      quantity : new FormControl(0),
      description : new FormControl(""),
      productType : new FormControl(""),
      purchaseDate : new FormControl(new Date()),
      classification : new FormControl(""),
      unitOfMeasurement : new FormControl(""),
    }
  )
  constructor()
  {
    effect(()=>{
      this.productForm.controls['name'].setValue(this.productService.getName());
      this.productForm.controls['brand'].setValue(this.productService.getBrand());
      this.productForm.controls['count'].setValue(this.productService.getCount());
      this.productForm.controls['pricePerItem'].setValue(this.productService.getPricePerItem());
      this.productForm.controls['price'].setValue(this.productService.getPrice());
      this.productForm.controls['seller'].setValue(this.productService.getSeller());
      this.productForm.controls['quantity'].setValue(this.productService.getQuantity());
      this.productForm.controls['description'].setValue(this.productService.getDescription());
      this.productForm.controls['productType'].setValue(this.productService.getProductType());
      this.productForm.controls['purchaseDate'].setValue(this.productService.getPurchaseDate());
      this.productForm.controls['classification'].setValue(this.productService.getClassification());
      this.productForm.controls['unitOfMeasurement'].setValue(this.productService.getUnitOfMeasurement());
    })
  }

  getPurchaseDate()
  {
    return formatDate(this.productService.getPurchaseDate(), 'yyyy-MM-ddTHH:mm', 'en-US');
  }

  updateProduct(productForm: NgForm) : void
  {
    if(productForm.dirty)
    {
      this.productService.update().subscribe();
      this.productForm.reset();
    }
    else
    {
      this.snackbar.setMessage("no changes have been made");
      this.snackbar.startSnackBar();
    }


  }


  deleteProduct()
  {
    this.uiDialogService.setTitle("Are you sure?");
    this.uiDialogService.setMessage(`You are about to delete <br><strong>${this.productService.getName()}</strong><br> this action is final and cannot be undone.`);
    this.uiDialogService.showModal();
    this.uiDialogService.onConfirmEvent$.subscribe(data =>{
      if(data == true)
      {
        this.productService.delete().subscribe()
      }
    })
  }

}

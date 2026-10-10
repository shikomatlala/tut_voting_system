import { Component, signal, inject } from '@angular/core';
import { UiTopNav } from '../../components/ui-top-nav/ui-top-nav';
import { UiSideNav } from '../../components/ui-side-nav/ui-side-nav';
import { UiForm } from '../../components/ui-form/ui-form';
import { FormsModule, NgForm } from '@angular/forms';
import { UiInputField } from '../../components/ui-input-field/ui-input-field';
import { NgClass } from '@angular/common';
import { PasswordControllerService } from '../../services/password-controller.service';
import { UiContentSection } from '../../components/ui-content-section/ui-content-section';

@Component({
  selector: 'app-account',
  imports: [
    NgClass,
    FormsModule,
    UiTopNav,
    UiSideNav,
    UiForm,
    UiInputField,
    UiContentSection
],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {

  isStudentNumberInputSelected = signal<boolean>(false);
  isPasswordInputSelected = signal<boolean>(false);
  passwordController = inject(PasswordControllerService)
  onSubmit(form: NgForm)
  {

  }

  showError(form: NgForm)
  {

  }
}

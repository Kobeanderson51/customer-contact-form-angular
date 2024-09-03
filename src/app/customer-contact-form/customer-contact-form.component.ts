import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-contact-form',
  templateUrl: './customer-contact-form.component.html',
  styleUrl: './customer-contact-form.component.css'
})
export class CustomerContactFormComponent {
  form: FormGroup;
  fb: FormBuilder = new FormBuilder();

  constructor(fb: FormBuilder) {
      this.form = fb.group({
      firstName: [ 'John' ],
      lastName: [ 'Doe' ],
      phoneNumbers: fb.array([fb.group({
        alias: ['Home'],
        number: ['555-555-5555']
      })]),
      address: fb.group({
        street: ['123 Main St.'],
        city: ['Salt Lake City'],
        state: ['UT'],
        zip: ['84001']
      })
    });
  }

    get phoneNumbers(): FormArray {
    return this.form.get('phoneNumbers') as FormArray;
  }

    reset(): void {
      this.form.controls['firstName'].setValue('');
      this.form.controls['lastName'].setValue('');
  }
    fillDefaultAddress(): void {
    this.form.patchValue({
      address: {
        street: '456 Default St',
        city: 'Defaultolopolis',
        state: 'CA',
        zip: '90000',
      }
    });
  }
    addPhone(): void {
    this.phoneNumbers.push(this.fb.group({
      alias: [''],
      number: ['']
    }));
  }
  
}

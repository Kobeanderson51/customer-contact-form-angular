import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-customer-contact-form',
  templateUrl: './customer-contact-form.component.html',
  styleUrl: './customer-contact-form.component.css'
})
export class CustomerContactFormComponent {
  form: FormGroup;
  fb: FormBuilder = new FormBuilder();
  customErrorStateMatcher: ErrorStateMatcher = new CustomErrorStateMatcher();


  constructor(fb: FormBuilder) {
          this.form = fb.group({
      firstName: [ 'John', Validators.required ],
      lastName: [ 'Doe', Validators.required ],
      email: [ 'john.doe@example.com', Validators.compose([ Validators.required, Validators.email ]) ],
      phoneNumbers: fb.array([ fb.group({
        alias: [ 'Home' ],
        number: [ '555-555-5555' ]
      }) ]),
      address: fb.group({
        street: [ '123 Main St.' ],
        city: [ 'Salt Lake City' ],
        state: [ 'UT' ],
        zip: [ '84001' ]
      })
    }, { validator: this.forbiddenFullNameValidator }); 
  }
  
    forbiddenFullNameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const firstName = control.get('firstName')?.value;
    const lastName = control.get('lastName')?.value;
    const fullName = `${ firstName } ${ lastName }`;
    const forbidden = new RegExp(/^[Mm]ickey [Mm]ouse$/).test(fullName);
    return forbidden ? { 'forbiddenFullName': { value: fullName } } : null;
  }

    forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = new RegExp(/mickey/i).test(control.value);
      return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    };
  }

    get phoneNumbers(): FormArray {
    return this.form.get('phoneNumbers') as FormArray;
  }

    reset(): void {
      this.form.controls['firstName'].setValue('');
      this.form.controls['lastName'].setValue('');
      this.form.controls['email'].setValue('');
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
class CustomErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl, form: FormGroupDirective): boolean {
    return form.getError('forbiddenFullName') || control.invalid;
  }

}
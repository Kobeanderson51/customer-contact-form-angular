import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactFormComponent } from './customer-contact-form.component';

describe('CustomerContactFormComponent', () => {
  let component: CustomerContactFormComponent;
  let fixture: ComponentFixture<CustomerContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerContactFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

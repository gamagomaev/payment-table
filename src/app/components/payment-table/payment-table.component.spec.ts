import { INumberOnlyValidator } from './../../models/interfaces/number-only-validator.interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTableComponent } from './payment-table.component';
import { IPayment } from 'src/app/models/interfaces/payment.interface';

describe('PaymentTableComponent', (): void => {
  let component: PaymentTableComponent;
  let fixture: ComponentFixture<PaymentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [PaymentTableComponent],
    }).compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(PaymentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('PaymentTableComponent should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('onSubmit() should call a addPayment() if a form is valid', (): void => {
    spyOn(component, 'addPayment');

    component.form = new FormGroup({
      paymentName: new FormControl('p1'),
      costPerDay: new FormControl('10'),
    });

    expect(component.form.valid).toEqual(true);
    expect(component.onSubmit());
    expect(component.addPayment).toHaveBeenCalledTimes(1);
  });

  it('getSumOfMonthlyPayment() should increment a total monthly sum of payment if checkbox checked', (): void => {
    spyOn(component, 'getTotalSum');
    component.payments = [
      {
        paymentName: 'p1',
        costPerDay: 30,
        monthsTotalSum: 0,
      },
    ];

    const equal: IPayment[] = [
      {
        paymentName: 'p1',
        costPerDay: 30,
        monthsTotalSum: 300,
      },
    ];

    expect(component.getSumOfMonthlyPayment(true, 30, 0, 10));
    expect(component.payments).toEqual(equal);
    expect(component.getTotalSum).toHaveBeenCalledTimes(1);
  });

  it('getSumOfMonthlyPayment() should decrement a total monthly sum of payment if checkbox unchecked', (): void => {
    spyOn(component, 'getTotalSum');
    component.payments = [
      {
        paymentName: 'p1',
        costPerDay: 30,
        monthsTotalSum: 300,
      },
    ];

    const equal: IPayment[] = [
      {
        paymentName: 'p1',
        costPerDay: 30,
        monthsTotalSum: 0,
      },
    ];

    expect(component.getSumOfMonthlyPayment(false, 30, 0, 10));
    expect(component.payments).toEqual(equal);
    expect(component.getTotalSum).toHaveBeenCalledTimes(1);
  });

  it('onSubmit() should not call a addPayment() if a form is invalid', (): void => {
    const spy: jasmine.Spy<() => void> = spyOn(component, 'addPayment');

    component.form = new FormGroup({
      paymentName: new FormControl(''),
      costPerDay: new FormControl(''),
    });

    fixture.detectChanges();
    component.form.controls.paymentName.setErrors({ required: true });
    expect(component.form.valid).toEqual(false);
    expect(component.onSubmit());
    expect(spy.calls.count()).toBe(0);
  });

  it('addPayment() should added a new payment to the array payments', (): void => {
    component.payments = [];

    component.form = new FormGroup({
      paymentName: new FormControl('p1'),
      costPerDay: new FormControl(10),
    });

    const equal: IPayment[] = [
      {
        paymentName: 'p1',
        costPerDay: 10,
        monthsTotalSum: 0,
      },
    ];

    expect(component.addPayment());
    expect(component.payments).toEqual(equal);
  });

  it('deletePayment() should delete a payment from an array payments', (): void => {
    component.payments = [
      {
        paymentName: 'p1',
        costPerDay: 10,
        monthsTotalSum: 0,
      },
      {
        paymentName: 'p2',
        costPerDay: 20,
        monthsTotalSum: 1000,
      },
    ];

    const equal: IPayment[] = [
      {
        paymentName: 'p1',
        costPerDay: 10,
        monthsTotalSum: 0,
      },
    ];

    expect(component.deletePayment(1));
    expect(component.payments).toEqual(equal);
  });

  it('numberOnlyValidator() should return null if a control value is a number', (): void => {
    const control: FormControl = new FormControl('777');

    expect(component.numberOnlyValidator(control)).toBe(null);
  });

  it('numberOnlyValidator() should return error object if a control value is not a number', (): void => {
    const control: FormControl = new FormControl('some77string');
    const equal: INumberOnlyValidator = {
      numberOnlyValidator: {
        valid: false,
      },
    };

    expect(component.numberOnlyValidator(control)).toEqual(equal);
  });

  it('getErrorMessage() should return error name', (): void => {
    const newError: { [key: string]: string } = { required: 'some value' };

    expect(component.getErrorMessage(newError)).toBe(
      'Это поле не должно быть пустым'
    );
  });
});

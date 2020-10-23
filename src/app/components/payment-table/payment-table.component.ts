import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { IInputFieldData } from '../../models/interfaces/input-field-data.interface';
import { Utils } from '../../helpers/utils';
import { CustomValidators } from '../controls/input-field/validators/validators';
import * as moment from 'moment';

interface IMonthPayment {
  id: number;
  name: string;
  daysNumber: number;
  checked: boolean;
}

interface IPayment {
  id: number;
  paymentName: string;
  costPerDay: number;
  checked: boolean;
}

interface ICheckedPayments {
  [key: string]: number;
}

@Component({
  selector: 'payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss'],
})
export class PaymentTableComponent implements OnInit {
  public form: FormGroup;
  private checkedPayments: ICheckedPayments = {};
  public totalSum: number = 0;
  public inputsFieldsData: IInputFieldData[] = [
    {
      controlName: 'paymentName',
      placeholder: 'Наименование платежа',
      type: 'text',
      validators: [
        Validators.required,
        CustomValidators.emptyFieldValidator.bind(this),
      ],
    },
    {
      controlName: 'costPerDay',
      type: 'text',
      placeholder: 'Стоимость за день',
      validators: [
        Validators.required,
        Validators.min(1),
        CustomValidators.numberOnlyValidator,
        CustomValidators.emptyFieldValidator.bind(this),
      ],
    },
  ];

  public months: IMonthPayment[];
  public payments: IPayment[] = [];

  ngOnInit(): void {
    this.form = Utils.getForm(this.inputsFieldsData);
    this.months = this.getMonths();
  }

  onSubmit(): void {
    if (this.form.valid || !this.form.disabled) {
      this.addPayment();
    }
  }

  checkPaymentMonth(
    event: MouseEvent,
    daysNumber: number,
    paymentId: number,
    costPerDay: number
  ): void {
    event.stopPropagation();
    const checkbox: HTMLInputElement = event.target as HTMLInputElement;
    let sum: number = daysNumber * costPerDay;

    if (checkbox.checked) {
      if (!this.checkedPayments[paymentId]) {
        this.checkedPayments[paymentId] = 0;
      }
      this.checkedPayments[paymentId] += sum;
    } else {
      if (!this.checkedPayments[paymentId]) {
        this.checkedPayments[paymentId] = 0;
      }
      this.checkedPayments[paymentId] -= sum;
    }

    this.getTotalSum();
  }

  getTotalSum(): void {
    let newSum: number = 0;
    Object.keys(this.checkedPayments).forEach((key: string): void => {
      newSum += this.checkedPayments[key];
    });

    this.totalSum = newSum;
  }

  addPayment(): void {
    const newPayment: IPayment = {
      id: this.getPaymentId(),
      ...this.form.value,
      checked: false,
    };
    this.payments.push(newPayment);
  }

  getPaymentId(): number {
    if (this.payments?.length > 0) {
      const sortPayments: IPayment[] = this.payments.sort(
        (a: IPayment, b: IPayment): number => a.id - b.id
      );
      const lastPaymentId: number = sortPayments[this.payments.length - 1].id;

      return lastPaymentId + 1;
    } else {
      return 1;
    }
  }

  deletePayment(paymentId: number): void {
    const newPayments: IPayment[] = this.payments.filter(
      (payment: IPayment): boolean => payment.id !== paymentId
    );

    this.payments = [...newPayments];

    delete this.checkedPayments[paymentId];
    this.getTotalSum();
  }

  setFormValue(controlValue: string, controlName: string): void {
    if (this.form.status === 'INVALID') {
      this.form.patchValue(
        {
          [controlName]: controlValue,
        },
        { emitEvent: true, onlySelf: false }
      );
    }
  }

  /*
    We use a library moment.js to accurately determine the number of days
    in a month from the current date, taking into account the leap year
  */
  getMonths(): IMonthPayment[] {
    let months: IMonthPayment[] = [];
    const currentMonthName: string = moment().format('MMMM');
    const baseMonths: string[] = moment.months(currentMonthName);

    let currentMonthNumber: number = baseMonths.findIndex(
      (monthName: string): boolean => monthName === currentMonthName
    );
    // We apply the current locale
    moment.locale('ru');

    let monthsCount: number = 12;

    for (let i: number = currentMonthNumber; i < monthsCount; i++) {
      const monthNameLong: string = moment().add(i, 'M').format('MMMM');

      const month: IMonthPayment = {
        id: Number(moment().month(monthNameLong).format('M')),
        name: moment().add(i, 'M').format('MMM').replace(/[.]/, ''),
        /*
          We added the next month at the method '.add()',
          that gives us months next year if the current month, not January.
          */
        daysNumber: moment().add(i, 'M').daysInMonth(),
        checked: false,
      };

      months.push(month);
      /*
      This condition allows us to work with the correct month number,
      which is necessary to find it at the "moment.js"
      */
      if (i === 11) {
        i = -1;
        monthsCount = currentMonthNumber;
      }
    }

    const sortMonths: IMonthPayment[] = months.sort(
      (a: IMonthPayment, b: IMonthPayment): number => a.id - b.id
    );

    return sortMonths;
  }
}

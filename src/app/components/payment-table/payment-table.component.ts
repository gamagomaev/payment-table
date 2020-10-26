import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TInputErrorName } from 'src/app/models/types/input-error-name.type';
import { inputErrorMessages } from '../../constants/constants';
import { INumberOnlyValidator } from '../../models/interfaces/number-only-validator.interface';
import { IMonthOfPayment } from '../../models/interfaces/month-of-payment.interface';
import { IPayment } from '../../models/interfaces/payment.interface';

@Component({
  selector: 'payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss'],
})
export class PaymentTableComponent implements OnInit {
  public form: FormGroup;
  public totalSum: number = 0;
  public months: IMonthOfPayment[];
  public payments: IPayment[] = [];
  private monthsNames: string[] = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ];

  ngOnInit(): void {
    this.form = this.getFormGroup();
    this.months = this.getMonths();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.addPayment();
    }
  }

  getSumOfMonthlyPayment(
    checked: boolean,
    daysNumber: number,
    index: number,
    costPerDay: number
  ): void {
    const sum: number = daysNumber * costPerDay;

    checked
      ? (this.payments[index].monthsTotalSum += sum)
      : (this.payments[index].monthsTotalSum -= sum);

    this.getTotalSum();
  }

  getTotalSum(): void {
    let newSum: number = 0;
    this.payments.forEach((payment: IPayment): void => {
      newSum += payment.monthsTotalSum;
    });
    this.totalSum = newSum;
  }

  addPayment(): void {
    const newPayment: IPayment = {
      ...this.form.value,
      monthsTotalSum: 0,
    };

    this.payments.push(newPayment);
  }

  deletePayment(paymentIndex: number): void {
    const newPayments: IPayment[] = this.payments.filter(
      (_: IPayment, index: number): boolean => index !== paymentIndex
    );

    this.payments = [...newPayments];

    this.getTotalSum();
  }

  getMonths(): IMonthOfPayment[] {
    let monthsCount: number = 12;
    let months: IMonthOfPayment[] = [];
    const currentDate: Date = new Date();
    let currentYearNumber: number = currentDate.getFullYear();
    const currentMonthNumber: number = currentDate.getMonth();

    for (let i: number = currentMonthNumber; i < monthsCount; i++) {
      const daysInMonth: number = new Date(
        currentYearNumber,
        i + 1,
        0
      ).getDate();

      const month: IMonthOfPayment = {
        id: i,
        name: this.monthsNames[i],
        daysNumber: daysInMonth,
      };

      months.push(month);

      if (i === 11) {
        i = -1;
        monthsCount = currentMonthNumber;
        currentYearNumber += 1;
      }
    }

    const sortMonths: IMonthOfPayment[] = months.sort(
      (a: IMonthOfPayment, b: IMonthOfPayment): number => a.id - b.id
    );

    return sortMonths;
  }

  getFormGroup(): FormGroup {
    return new FormGroup({
      paymentName: new FormControl('', Validators.required),
      costPerDay: new FormControl('', [
        Validators.required,
        Validators.min(1),
        this.numberOnlyValidator,
      ]),
    });
  }

  numberOnlyValidator(control: FormControl): INumberOnlyValidator | null {
    const letters: RegExp = new RegExp(/^[0-9]+$/, 'ig');
    const haveLetters: number = control.value.search(letters);

    if (haveLetters === -1) {
      return {
        numberOnlyValidator: {
          valid: false,
        },
      };
    } else {
      return null;
    }
  }

  getErrorMessage(errors: { [key: string]: string }): string {
    const errorName: TInputErrorName = Object.keys(
      errors
    )[0] as TInputErrorName;

    return inputErrorMessages[errorName];
  }
}

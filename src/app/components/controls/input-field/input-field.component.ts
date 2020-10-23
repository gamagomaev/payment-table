import {
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TInputErrorName } from 'src/app/models/types/input-error-name.type';
import { IInputFieldData } from '../../../models/interfaces/input-field-data.interface';
import { InputErrors } from './errors/input-errors';

@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // tslint:disable-next-line: typedef
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements OnInit {
  @Input() data: IInputFieldData;
  @Input() translateFlag: boolean = true;
  @Input() type: string = 'text';
  @Input() additionalText: string = '';
  @Input() controlName: string = '';
  @Input() error: boolean = false;
  @Input() style: { [key: string]: string } = {};
  public alertText: string;
  public disabled: boolean;
  public ngControl: NgControl;
  public errorMessage: string = '';

  @Input() value: string;
  @Output() submitData: EventEmitter<string> = new EventEmitter();

  private onChange = (value: string): void => {};
  private onTouched = () => {};

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null); // Get this a control object
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: string): void {
    this.value = outsideValue; // Fires only when receiving value from the form
  }

  updateValue(event: Event, value: string): void {
    event.stopPropagation();
    this.onChange(value); // Notify a Forms API
    this.onTouched();
    this.getErrorMessage();
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  sendAutofillEvent(value: string): void {
    this.submitData.emit(value);
  }

  getErrorMessage(): void {
    if (this.ngControl?.errors) {
      const errorName: TInputErrorName = Object.keys(
        this.ngControl.errors
      )[0] as TInputErrorName;
      this.errorMessage = InputErrors.getMessage(errorName);
    }
  }
}

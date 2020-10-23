import {ValidatorFn} from '@angular/forms';

export interface IInputFieldData {
  action?: string;
  controlName?: string;
  disabled?: boolean;
  icon?: string;
  label?: string;
  labelPosition?: string;
  placeholder?: string;
  type?: string;
  useButton?: boolean;
  value?: string;
  validators?: ValidatorFn[];
  additionalText?: string;
}

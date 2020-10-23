import { FormControl, FormGroup } from '@angular/forms';
import { IInputFieldData } from '../models/interfaces/input-field-data.interface';

export class Utils {
  static getForm(controlsData: IInputFieldData[]): FormGroup {
    const newFormGroup: FormGroup = new FormGroup({});

    controlsData.forEach((control: IInputFieldData): void => {
      if (Object.prototype.hasOwnProperty.call(control, 'controlName')) {
        const newFormControl: FormControl = new FormControl(
          control.value || ''
        );
        if (control.validators && control.validators.length) {
          newFormControl.setValidators(control.validators);
        }
        newFormGroup.addControl(control.controlName, newFormControl);
      }
    });

    return newFormGroup;
  }
}

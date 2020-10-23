import { FormControl } from '@angular/forms';
import { async } from '@angular/core/testing';
import { CustomValidators } from './validators';

describe('InputFieldComponent', () => {
  let component: CustomValidators;

  beforeEach(async((): void => {
    let customValidators;

    beforeEach((): void => {
      spyOn(CustomValidators, 'emptyFieldValidator');
      customValidators = new CustomValidators();
    });

    it('should create CustomValidators', (): void => {
      expect(component).toBeTruthy();
    });

    it('emptyFieldValidator() should set an empty string to control if the value only consists of spaces', (): void => {
      const control: FormControl = new FormControl();
      control.setValue('         ');

      customValidators.emptyFieldValidator(control.value);
      expect(control.value).toEqual('');
    });
  }));
});

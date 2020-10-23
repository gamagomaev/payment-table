import { TInputErrorName } from 'src/app/models/types/input-error-name.type';
import { async } from '@angular/core/testing';
import { InputErrors } from './input-errors';

describe('InputFieldComponent', () => {
  let component: InputErrors;

  beforeEach(async((): void => {
    let inputErrors;

    beforeEach((): void => {
      spyOn(InputErrors, 'getMessage');
      inputErrors = new InputErrors();
    });

    it('should create', (): void => {
      expect(component).toBeTruthy();
    });

    it('getMessage() should return required message "Это поле не должно быть пустым"', (): void => {
      const errorName: TInputErrorName = 'required';

      inputErrors
        .getMessage(errorName)
        .expect('Это поле не должно быть пустым');
    });
  }));
});

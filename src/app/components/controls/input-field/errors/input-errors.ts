import { TInputErrorName } from '../../../../models/types/input-error-name.type';

interface IInputErrors {
  required: string;
  numberOnlyValidator: string;
  min: string;
}

export class InputErrors {
  static getMessage(errorName: TInputErrorName): string {
    return errors[errorName];
  }
}

const errors: IInputErrors = {
  required: 'Это поле не должно быть пустым',
  numberOnlyValidator: 'Значение должно быть числом',
  min: 'Значение должно быть бельше 0',
};

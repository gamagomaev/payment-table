import { FormControl } from '@angular/forms';

interface INumberOnlyValidator {
  numberOnlyValidator: {
    valid: boolean;
  };
}

export class CustomValidators {
  static emptyFieldValidator(control: FormControl): void {
    if (control.value && !control.value.trim()) {
      control.setValue('');
    }
  }

  static numberOnlyValidator(
    control: FormControl
  ): INumberOnlyValidator | null {
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
}

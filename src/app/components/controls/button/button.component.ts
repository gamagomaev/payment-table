import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BUTTON_STYLE } from '../../../constants/enums';

type TButtonStyle = 'primary' | 'secondary' | 'text' | 'delete';

@Component({
  selector: 'button-comp',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() name: string = '';
  @Input() typeStyle: TButtonStyle = BUTTON_STYLE.PRIMARY;
  @Input() disabled: boolean = false;

  // This output you should use only then a button is outside the form.
  @Output() buttonEvent: EventEmitter<void> = new EventEmitter();

  onClickButton(): void {
    this.buttonEvent.emit();
  }
}

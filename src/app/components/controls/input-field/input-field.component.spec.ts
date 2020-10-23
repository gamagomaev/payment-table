import { async, TestBed } from '@angular/core/testing';
import { InputFieldComponent } from './input-field.component';

describe('InputFieldComponent', () => {
  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [InputFieldComponent],
    }).compileComponents();
  }));

  it('should create the InputFieldComponent', (): void => {
    const fixture = TestBed.createComponent(InputFieldComponent);
    const inputFieldComponent = fixture.componentInstance;
    expect(inputFieldComponent).toBeTruthy();
  });
});

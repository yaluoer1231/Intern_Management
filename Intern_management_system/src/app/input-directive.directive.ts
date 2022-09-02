import { Directive, ElementRef , forwardRef, OnInit } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, PatternValidator, Validator } from '@angular/forms';

@Directive({
  selector: '[appInputDirective][ngModel],[formControlName][ngModel],[formControl][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => InputDirectiveDirective), multi: true }
  ]
})
export class InputDirectiveDirective  implements Validator {
  validator!: Function;

  validate(c: FormControl) {
    let EMAIL_REGEXP = /^(09)[0-9]{8}$/

    return EMAIL_REGEXP.test(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }
}

  
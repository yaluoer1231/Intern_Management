import { Directive, ElementRef , forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, PatternValidator, Validator } from '@angular/forms';

@Directive({
  selector: '[inputDirective][ngModel],[formControlName][ngModel],[formControl][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => InputDirectiveDirective), multi: true }
  ]
})
export class InputDirectiveDirective  implements Validator {
  @Input() name! : string;//抓到傳入物件的相對應的內容
  
  private readonly invalidResult = {
    validatePhoneNumber :{
      valid : false
    }
  };

  validate(c: FormControl) {
    if (!c.value) //如果沒有輸入文字，回傳空物件代表通過
      return null;

    let telphone = /^(\d{3,4})[\s\-]?\d{4}$/
    let cellphone = /^(09)(\d{2})[\s\-]?\d{3}[\s\-]?\d{3}$/;
    //^(09):開頭必須是09，括號可省略 \d：任意數字 {2}：限制兩個字 \s：空白 \-：減號 ?：可有可無 []：比對括號裡任一字元 $：結尾

    if (Number(c.value.slice(0,2)) == 9){
      return cellphone.test(c.value) ? null :{
        validatePhoneNumber :{
          valid : false
        }
      }
    }
    else 
      return telphone.test(c.value) ? null :{
        validatePhoneNumber :{
          valid : false
        }
      }
  }
}

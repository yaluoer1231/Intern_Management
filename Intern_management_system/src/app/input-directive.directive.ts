import { Directive, ElementRef , forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, PatternValidator, Validator } from '@angular/forms';

@Directive({
  selector: '[inputDirective][ngModel],[formControlName][ngModel],[formControl][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => InputDirectiveDirective), multi: true }
  ]
})
export class InputDirectiveDirective  implements Validator {
  @Input() value! : number;//抓到傳入物件的相對應的內容

  
  private readonly invalidResult = {
    validatePhoneNumber :{
      valid : false
    }
  };

  validate(c: FormControl) {
    if (!c.value) //如果沒有輸入文字，回傳空物件代表通過
      return null;

    let telephone = /^(\d{3,4})[\s\-]?\d{4}$/     //區碼約兩位數
    let telephone2 = /^(\d{2,3})[\s\-]?\d{3,4}$/  //區碼為三位數
    let telephone3 = /^(\d{2,3})[\s\-]?\d{2,3}$/  //區碼為四位數

    let cellphone = /^(09)(\d{2})[\s\-]?\d{3}[\s\-]?\d{3}$/;
    //^(09):開頭必須是09，括號可省略 \d：任意數字 {2}：限制兩個字 \s：空白 \-：減號 ?：可有可無 []：比對括號裡任一字元 $：結尾
    var checkPhone : boolean = false;
    
    switch(Number(this.value)){
      case 2: case 3: case 4: case 5: 
      case 6: case 7: case 8:
        if (Number(c.value.slice(0,2)) != 9)  //如果選擇非手機的選項時輸入手機號碼，必定顯示錯誤
          checkPhone = telephone.test(c.value); //辨識結果為true後傳到checKPhone
        break;
      case 37: case 49: case 89: case 82:
        if (Number(c.value.slice(0,2)) != 9)
          checkPhone = telephone2.test(c.value);
        break;
      case 826: case 836:
        if (Number(c.value.slice(0,2)) != 9)
          checkPhone = telephone3.test(c.value);
        break;
      case 9:
        checkPhone = cellphone.test(c.value);
        break;
    }

    if (checkPhone == true)
      return null;                //只要符合，就回傳空值，代表正確
    else
      return this.invalidResult;  //不符合上述任何一項者，輸出錯誤訊行
  }
}

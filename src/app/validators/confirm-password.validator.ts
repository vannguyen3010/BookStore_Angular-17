import { FormGroup } from "@angular/forms"

export const confirmPasswordValidator = (controlName: string, controlNameToMatch: string)=>{
  return (formGroup: FormGroup)=>{
    let control = formGroup.controls[controlName];
    let controlToMatch = formGroup.controls[controlNameToMatch];

    if (controlToMatch.errors && !controlToMatch.errors['confirmPasswordValidator']){
      return;
    }
    //Nếu controlToMatch đã có lỗi khác mà không phải lỗi confirmPasswordValidator, thì không làm gì và thoát khỏi hàm.
    if(control.value !== controlToMatch.value){
      controlToMatch.setErrors({ confirmPasswordValidator : true})
      //Nếu giá trị của control và controlToMatch không khớp nhau, thiết lập lỗi { confirmPasswordValidator : true} cho controlToMatch.
    }else{
      controlToMatch.setErrors(null);
      //Nếu giá trị của hai trường khớp nhau, xóa lỗi của controlToMatch bằng cách gọi controlToMatch.setErrors(null).
    }
  }
}

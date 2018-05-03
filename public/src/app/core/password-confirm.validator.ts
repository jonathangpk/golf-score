import { AbstractControl } from '@angular/forms';


export class PasswordConfirmValidator {
  static matchPassword(ac: AbstractControl) {
    const pw = ac.get('password').value;
    const pwc = ac.get('passwordConfirm').value;
    if (pw !== pwc) {
      ac.get('passwordConfirm').setErrors({matchingPassword: false});
    } else {
      return null;
    }

  }
}

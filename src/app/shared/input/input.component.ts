import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export default class InputComponent {
  @Input() label: string;
  @Input() inputType: string;
  @Input() prefixIcon: string;
  @Input() postFixIcon: string;
  @Input() control: FormControl;

  getErrorLengths() {
    if (this.control.errors && Object.keys(this.control.errors)) {
      return Object.keys(this.control.errors).length;
    } else {
      return 0;
    }
  }
  errorMessageBuilder() {
    if (this.getErrorLengths() > 0) {
      let message = '';
      const errors = this.control.errors;
      if (errors.required) {
        message = 'Field is required!';
      } else if (errors.message) {
        message = errors.message;
      } else if (errors.email) {
        message = 'Invalid Email';
      } else if (errors.minlength) {
        message = `Input must be ${errors.minlength.requiredLength} char long!`;
      } else if (errors.maxlength) {
        message = `Input must be ${errors.maxlength.requiredLength} char long!`;
      } else {
        message = 'Invalid Value!';
      }
      return message;
    }
  }
}

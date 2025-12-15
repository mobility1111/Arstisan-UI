import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//import ValidateForm from 'src/app/helpers/validateform';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { ConfirmPasswordValidator } from './helpers/confirm-password.validator';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;

  resetPasswordObj = new ResetPassword();

  eyeIcon: string = "bi-eye-slash-fill";
  isText: boolean = false;
  type: string = "password";

  constructor(
    private fb: FormBuilder,
    private activated: ActivatedRoute,
    private router: Router,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit(): void {

    // Initialize form
    this.resetPasswordForm = this.fb.group(
      {
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required]
      },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
    );

    // Read reset link params
    this.activated.queryParams.subscribe(params => {
      this.emailToReset = params['email'];

      const tokenFromURL = params['code'];
      this.emailToken = tokenFromURL.replace(/ /g, '+');
    });
  }

  // Toggle password visibility
  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "bi-eye-fill" : "bi-eye-slash-fill";
    this.type = this.isText ? "text" : "password";
  }

  // Submit reset request
  reset() {
    if (this.resetPasswordForm.valid) {

      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;

      this.resetPasswordService.resetPassword(this.resetPasswordObj).subscribe({
        next: (res) => {
          console.log("API Response: ", res);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error("Reset Error: ", err);
        }
      });

    } else {
      // Mark all fields as touched to show errors
      //ValidateForm.validateAllFormFields(this.resetPasswordForm);
    }
  }

}

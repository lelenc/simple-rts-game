import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showErrorMessages = false;
  loginForm: FormGroup;
  errorMessages: { [key: string]: string } = {};

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      //testMode: [false]
    });

    this.errorMessages = {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 3 characters long.',
      'maxlength': 'Username cannot be longer than 10 characters.'
    };
  }

  login() {
    this.showErrorMessages = true;

    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      this.authService.login(username);

      /*const testMode = this.loginForm.value.testMode; // Test mode érték kiolvasása
      console.log("testMode", testMode);

      if (this.testMode) {
        this.authService.enableTestMode();
      } else {
        this.authService.disableTestMode();
      }*/

      this.router.navigate(['/game']);
    }
  }

  getErrorMessage() {
    const errors = this.loginForm.get('username').errors;

    if (errors) {
      const firstErrorKey = Object.keys(errors)[0];
      return this.errorMessages[firstErrorKey];
    }

    return '';
  }
}

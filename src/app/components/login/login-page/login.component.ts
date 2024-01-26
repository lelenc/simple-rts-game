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
 
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      this.authService.login(username);
      console.log('Bejelentkezési adatok:', username);
      this.router.navigate(['/game']);
    } else {
      // TODO
    }
  }
}

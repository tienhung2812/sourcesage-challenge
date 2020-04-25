import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../../services/index';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;
  errorMessage;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.errorMessage = "Invalid input";
      return;
    }
    this.errorMessage = "";
    this.authService.login(this.loginForm.value['email'], this.loginForm.value['password']).subscribe(
      (resp) => {
        let token = resp.token;
        this.cookieService.set('token',token);
        this.router.navigate(['']);
      },error => {
        this.errorMessage = "Invalid credentials";
        return;
      }
    )

  }
}

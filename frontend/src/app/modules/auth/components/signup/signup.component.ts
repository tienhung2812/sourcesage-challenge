import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/index';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm;
  errorMessage;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) { 
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.errorMessage = "Invalid input";
      return;
    }
    this.errorMessage = "";
    this.authService.signup(
      this.registerForm.value['name'],
      this.registerForm.value['email'],
      this.registerForm.value['password'],
      this.registerForm.value['gender'],
      this.registerForm.value['age']
    ).subscribe(
      (resp) => {
        let token = resp.token;
        this.cookieService.set('token',token);
        this.router.navigate(['']);
      },error => {
        this.errorMessage = "Invalid input";
        return;
      }
    )

  }

}

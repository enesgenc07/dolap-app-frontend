import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.email]
    });
  }

  onSubmit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        const email = this.form.get('email').value;

        this.authService.register(username, password, email).subscribe(
          data => {
            this.toastr.success('Congratulations! Your registration completed successfully.');
            this.router.navigate(['/auth/signin']);
          }, err => {
            this.toastr.error(err.error.message);
          }
        );
      } catch (err) {
        this.toastr.error(err.error.message);
        this.loginInvalid = true;
      }
    }
  }

}

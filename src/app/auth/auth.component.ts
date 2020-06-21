import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TokenStorageService} from '../token-storage.service';
import {AuthService} from '../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;

  constructor(
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    private authService: AuthService, private router: Router, private toastr: ToastrService
  ) {
  }

  ngOnInit() {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        this.authService.login(username, password).subscribe(
          data => {
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
            this.router.navigate(['dolap/admin']);
          }, err => {
            this.toastr.error(err.error.message);
          }
        );
      } catch (err) {
        this.toastr.error(err.error.message);
      }
    }
  }
}

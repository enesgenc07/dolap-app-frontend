import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'http://18.157.149.249:8093/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(uname, pass): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: uname,
      password: pass
    }, httpOptions);
  }

  register(uname, pass, mail): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: uname,
      password: pass,
      email: mail
    }, httpOptions);
  }
}

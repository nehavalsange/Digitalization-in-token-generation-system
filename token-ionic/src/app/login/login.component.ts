import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceContext } from '../service-context';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';
  public message = '';
  public hide = true;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() { }

  public onLogin() {

    this.http.post(ServiceContext.BASE_URL + '/login_token.htm', {
      username: this.username,
      password: this.password
    }).subscribe((response) => {
      let status = response['status'];

      if (status === 'success') {
        this.message = 'Login successful';
        this.username = '';
        this.password = '';
        let user = response['user'];
        console.log(user);
        if (user['role'] === 'Token Generator') {
          this.router.navigateByUrl('/generate-token');
        } else {
        this.router.navigateByUrl('/windowoperatorhome');
        }
      } else {
        this.message = 'Incorrect Username or Password';
      }
    }, (error) => {
      console.log('error', error);
    });

    // if (this.username === 'abcd' && this.password === 'efgh') {
    //   this.router.navigateByUrl('/generate-token');
    // } else {
    //   this.message = 'Invalid username or password';
    // }
  }

}

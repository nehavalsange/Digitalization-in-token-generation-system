import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {

  public username = '';
  public password = '';
  public message = '';

  constructor(private router: Router) { }

  ngOnInit() { }

  public onLogin() {

    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigateByUrl('/adminhome');
    } else {
      this.message = 'Invalid username or password';
    }
  }
}

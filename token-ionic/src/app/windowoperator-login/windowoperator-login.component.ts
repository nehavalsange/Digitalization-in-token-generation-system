import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceContext } from '../service-context';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-windowoperator-login',
  templateUrl: './windowoperator-login.component.html',
  styleUrls: ['./windowoperator-login.component.scss'],
})
export class WindowoperatorLoginComponent implements OnInit {

  public username = '';
  public password = '';
  public message = '';
  public windowStatuses = [];
  displayedColumns = ['windowNo', 'currentToken'];

  dataSource = new MatTableDataSource();

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    window.setInterval(() => {
      this.http.post(ServiceContext.BASE_URL + '/windowstatuses.htm', {}).subscribe((response) => {
        this.windowStatuses = response['windowStatuses'];
        this.dataSource.data = response['windowStatuses'];
      });
    }, 5000);
  }


  public onLogin() {

    if (this.username === 'abcd' && this.password === 'efgh') {
      this.router.navigateByUrl('/windowoperatorhome');
    } else {
      this.message = 'Invalid username or password';
    }
  }


}

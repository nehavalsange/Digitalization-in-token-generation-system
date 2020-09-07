import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceContext } from '../service-context';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  public mobileno = '';
  public tokenno = '';
  public message = '';
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
   }

  public onSubmit() {
    this.http.post(ServiceContext.BASE_URL + '/smsservice.htm', {
      mobileno: this.mobileno,
      tokenno: this.tokenno
    }).subscribe((response) => {
      let status = response['status'];
      let msg = response['message'];
      this.message = msg;
      this.mobileno = '';
      this.tokenno = '';
    }, (error) => {
      console.log('error', error);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceContext } from '../service-context';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-addnewoperator',
  templateUrl: './addnewoperator.component.html',
  styleUrls: ['./addnewoperator.component.scss'],
})
export class AddnewoperatorComponent implements OnInit {

  public username = '';
  public password = '';
  public name = '';
  public role = '';
  public message = '';
  constructor(private router: Router ,  private http: HttpClient, public dialogRef: MatDialogRef<AddnewoperatorComponent>) { }

  ngOnInit() { }

  public onSubmit() {
    this.http.post(ServiceContext.BASE_URL + '/addnewoperator.htm', {
      username: this.username,
      password: this.password,
      name: this.name,
      role: this.role
    }).subscribe((response) => {
      let status = response['status'];

      if (status === 'success') {
        this.message = 'Successfully Inserted';
        this.username = ' ';
        this.password = ' ';
        this.name = ' ';
        this.role = ' ';
        // this.router.navigateByUrl('/adminhome');
        this.dialogRef.close();
      } else {
        this.message = 'Username Already Exists';
        this.username = ' ';
        this.password = ' ';
        this.name = ' ';
        this.role = ' ';
      }
    }, (error) => {
      console.log('error', error);
    });
  }
}

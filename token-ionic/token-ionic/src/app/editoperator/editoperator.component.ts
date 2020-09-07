import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceContext } from '../service-context';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AdminHomeComponent } from '../admin-home/admin-home.component';


@Component({
  selector: 'app-editoperator',
  templateUrl: './editoperator.component.html',
  styleUrls: ['./editoperator.component.scss'],
})
export class EditoperatorComponent implements OnInit {

  public username = '';
  public password = '';
  public name = '';
  public role = '';
  public message = '';
  public id = '';
  public users = [];
// tslint:disable-next-line:new-parens

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router , private http: HttpClient,
              public dialogRef: MatDialogRef<EditoperatorComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
                this.id = data.id;
                console.log('IN CONSTRUCTOR!!!!!' + data.id);
               }

  ngOnInit() {
    console.log('IN NGONINIT !!!!!' + this.id );
    this.http.post(ServiceContext.BASE_URL + '/getoperator.htm', {
      userId: this.id
    }).subscribe((response) => {
      let status = response['status'];

      if (status === 'success') {
        this.users = response['user'];
        this.name  = this.users.name;
        this.username  = this.users.userName;
        this.password  = this.users.passwordhash;
        this.role  = this.users.role;
        console.log(this.users);
      } else {
     //   this.message = 'failed';
      }
    }, (error) => {
      console.log('error', error);
    });


   }

  public onSubmit() {
    this.http.post(ServiceContext.BASE_URL + '/editoperator.htm', {
      username: this.username,
      password: this.password,
      name: this.name,
      role: this.role,
      userId: this.id
    }).subscribe((response) => {
      let status = response['status'];

      if (status === 'success') {
        this.message = 'Successfully Inserted';
        this.username = ' ';
        this.password = ' ';
        this.name = ' ';
        this.role = ' ';
        this.dialogRef.close();
 //       this.router.navigateByUrl('/adminhome');
      } else {
        this.message = 'Username Already Exists';
      }
    }, (error) => {
      console.log('error', error);
    });
  }
  closeDialog() { this.dialogRef.close(); }
  //  this.dialogRef.close({event: 'close', data: this.fromDialog}); }

}

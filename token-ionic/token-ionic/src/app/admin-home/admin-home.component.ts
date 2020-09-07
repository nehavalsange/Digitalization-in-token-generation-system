import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceContext } from '../service-context';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { AlertController } from '@ionic/angular';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { AddnewoperatorComponent } from '../addnewoperator/addnewoperator.component';
import { EditoperatorComponent } from '../editoperator/editoperator.component';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  [x: string]: any;

  public username = '';
  public password = '';
  public name = '';
  public role = '';

  displayedColumns = ['userId', 'name', 'userName', 'role', 'Actions'];

  dataSource = new MatTableDataSource();

  constructor(private router: Router, private alertCtrl: AlertController, private http: HttpClient,
              private dialog: MatDialog) { }
  ngOnInit() {
    this.showdata(); }
    public  showdata() {
      this.http.post(ServiceContext.BASE_URL + '/userDetails.htm', {}).subscribe((response) => {
        this.dataSource.data = response['userdetails'];
      });
    }
  public onAddnewoperator() {
    this.dialog.open(AddnewoperatorComponent, {
      height: '380px',
      width: '600px',
    });
    this.showdata();

  }

//   public async onAddnewoperator1() {
//       const alert = await this.alertCtrl.create({
//         message: 'Enter Window Number',
//         inputs: [
//           {
//             name: 'name',
//             placeholder: 'Name'
//           },
//           {
//             name: 'username',
//             placeholder: 'User Name'
//           },
//           {
//             name: 'password',
//             placeholder: 'Password'
//           },
//           {
//             type: 'radio',
//             name: 'Windowoperator',
//             label: 'Windowoperator',
//             value: 'Window operator',
//             checked: true

//           },
//           {
//             type: 'radio',
//             name: 'TokenGenerator',
//             label: 'TokenGenerator',
//             value: 'Token Generator'
//           }
//         ],
//         buttons: [
//           {
//             text: 'Save',
//             role: 'Save',
//             handler: data => {
//               // this.num = Number(data.WindowNumber);
//               // console.log(data.WindowNumber);
//               // console.log(this.num);
//               // if (this.num > 0 && this.num < 21) {
//               //   this.windownumber = data.WindowNumber;
//               // } else {
//               //   // this.showAlert();
//               //   console.log('Invalid Window Number');
//               //   this.windownumber = 'Invalid Window No';
//               // }

//               this.http.post(ServiceContext.BASE_URL + '/addnewoperator.htm', {
//                 username: data.username,
//                 password: this.password,
//                 name: this.name,
//                 role: this.role
//               }).subscribe((response) => {
//                 let status = response['status'];
//                 if (status === 'success') {
//                   this.message = 'Successfully Inserted';
//                   this.username = ' ';
//                   this.password = ' ';
//                   this.name = ' ';
//                   this.role = ' ';
//                   this.router.navigateByUrl('/adminhome');
//                 } else {
//                   this.message = 'Username Already Exists';
//                   this.username = ' ';
//                   this.password = ' ';
//                   this.name = ' ';
//                   this.role = ' ';
//                 }
//               }, (error) => {
//                 console.log('error', error);
//               });

//             }
//           }
//         ]
//       });
//       await alert.present();
// // this.router.navigateByUrl('/addnewoperator');
//   }

  public onDelete(userid: number) {
    console.log('userid to delete', userid);
    if (confirm('Are you sure to delete ' + userid)) {
      console.log('Implement delete functionality here');
      this.http.post(ServiceContext.BASE_URL + '/deleteoperator.htm', {
        userId: userid
      }).subscribe((response) => {
        let status = response['status'];
        if (status === 'success') {
          this.showdata();
        } else {
          this.message = 'Unsuccessful!!!!!!!';
          }
      }, (error) => {
        console.log('error', error);
      });
    }
     }
  public onEdit(userid: string) {
    this.dialog.open(EditoperatorComponent, {
      height: '480px',
      width: '600px',
      data: {id: userid}
    });
    this.showdata();

      }
}

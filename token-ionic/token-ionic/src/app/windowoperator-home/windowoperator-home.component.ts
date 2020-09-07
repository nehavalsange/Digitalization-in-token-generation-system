import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ServiceContext } from '../service-context';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-windowoperator-home',
  templateUrl: './windowoperator-home.component.html',
  styleUrls: ['./windowoperator-home.component.scss'],
})
export class WindowoperatorHomeComponent implements OnInit {

  public windownumber = 'Choose Number';
  public currenttoken = '';
  public num = 0;
  public windowStatuses = [];
  displayedColumns = ['windowNo', 'currentToken'];

  dataSource = new MatTableDataSource();

  constructor(private router: Router, private alertCtrl: AlertController, private http: HttpClient) { }

  ngOnInit() {
    window.setInterval(() => {
      this.http.post(ServiceContext.BASE_URL + '/windowstatuses.htm', {}).subscribe((response) => {
        this.windowStatuses = response['windowStatuses'];
        this.dataSource.data = response['windowStatuses'];
      });
    }, 1000);
  }

  public nextToken() {
    if (this.num > 0 && this.num < 21) {
      this.http.post(ServiceContext.BASE_URL + '/nexttokenforwindow.htm', {
        windowno: this.windownumber
      }).subscribe(
        (response) => {
          console.log(response);
          if (response['status'] === 'success') {
            this.currenttoken = response['token'];
            console.log(response['token']);
          } else if (response['status'] === 'failed') {
            this.currenttoken = response['message'];
          }
        }
      );
    } else {
      console.log('Error');
    }

  }
  // public async showAlert() {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Alert',
  //     subHeader: 'SubTitle',
  //     message: 'This is an alert message',
  //     buttons: ['OK']
  //   });
  //   await alert.present();
  //   const result = await alert.onDidDismiss();
  //   console.log(result);
  // }



  public async presentPrompt() {
    const alert = await this.alertCtrl.create({
      message: 'Enter Window Number',
      inputs: [
        {
          name: 'WindowNumber',
          placeholder: 'Window Number'
        }
      ],
      buttons: [
        {
          text: 'Save',
          role: 'Save',
          handler: data => {
            this.num = Number(data.WindowNumber);
            console.log(data.WindowNumber);
            console.log(this.num);

            if (this.num > 0 && this.num < 21) {
              this.windownumber = data.WindowNumber;
            } else {
              // this.showAlert();
              console.log('Invalid Window Number');
              this.windownumber = 'Invalid Window No';
            }
          }
        }
      ]
    });
    await alert.present();
  }
}


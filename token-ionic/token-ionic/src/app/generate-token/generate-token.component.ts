import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceContext } from '../service-context';
import { AlertController } from '@ionic/angular';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.scss'],
})
export class GenerateTokenComponent implements OnInit {

  public currenttoken = '';
  public mobileno = '';
  public num = 0;
  public windowStatuses = [];
  displayedColumns = ['windowNo', 'currentToken'];

  dataSource = new MatTableDataSource();
  constructor(private router: Router, private http: HttpClient, private alertCtrl: AlertController) { }

  ngOnInit() {
    window.setInterval(() => {
      this.http.post(ServiceContext.BASE_URL + '/windowstatuses.htm', {}).subscribe((response) => {
        this.windowStatuses = response['windowStatuses'];
        this.dataSource.data = response['windowStatuses'];
      });
    }, 1000);
  }


  public async nextToken() {
    const alert = await this.alertCtrl.create({
      message: 'Enter Mobile Number of Customer',
      inputs: [
        {
          name: 'MobileNumber',
          placeholder: 'Mobile Number'
        }
      ],
      buttons: [
        {
          text: 'Save',
          role: 'Save',
          handler: data => {
            this.mobileno = (data.MobileNumber);
            // console.log(data.WindowNumber);
            // console.log(this.num);
            if ((this.mobileno.length > 0 && this.mobileno.length < 11) || (this.mobileno.length === 0)) {
              this.http.post(ServiceContext.BASE_URL + '/nexttoken.htm', {
                mobileno: this.mobileno,
              }).subscribe(
                (response) => {
                  console.log(response);
                  if (response['status'] === 'success') {
                    this.currenttoken = response['token'];
                    this.mobileno = '';
                  } else if (response['status'] === 'failed') {
                    this.currenttoken = response['message'];
                  }
                }
              ); } else {
              // console.log('Invalid Window Number');
              // this.windownumber = 'Invalid Window No';
            }
          }
        }
      ]
    });
    await alert.present();
}

}

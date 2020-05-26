import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceContext } from '../service-context';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.scss'],
})
export class GenerateTokenComponent implements OnInit {

  public currenttoken = '';
  public mobileno = '';
  constructor(private router: Router, private http: HttpClient, private alertCtrl: AlertController) { }

  ngOnInit() { }

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
            if (this.mobileno.length > 0 && this.mobileno.length < 11) {
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

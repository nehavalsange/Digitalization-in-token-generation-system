import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceContext } from '../service-context';

@Component({
  selector: 'app-delete-operator',
  templateUrl: './delete-operator.component.html',
  styleUrls: ['./delete-operator.component.scss'],
})
export class DeleteOperatorComponent implements OnInit {

  public username = '';
  public name = '';
  public message = '';
  constructor(private router: Router ,  private http: HttpClient) { }

  ngOnInit() { }

  public onSubmit() {
    this.http.post(ServiceContext.BASE_URL + '/deleteoperator.htm', {
      username: this.username
    }).subscribe((response) => {
      let status = response['status'];

      if (status === 'success') {
        this.message = 'Successfully Deleted';
        this.username = ' ';
        this.name = ' ';
        this.router.navigateByUrl('/adminhome');
      } else {
        this.message = 'Invalid Username!!!!';
        this.username = ' ';
        this.name = ' ';
      }
    }, (error) => {
      console.log('error', error);
    });
  }

}

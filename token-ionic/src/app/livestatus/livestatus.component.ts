import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceContext } from '../service-context';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
@Component({
  selector: 'app-livestatus',
  templateUrl: './livestatus.component.html',
  styleUrls: ['./livestatus.component.scss'],
})
export class LivestatusComponent implements OnInit {

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
    }, 1000);
   }

}

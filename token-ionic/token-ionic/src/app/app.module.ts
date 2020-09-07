import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { GenerateTokenComponent } from './generate-token/generate-token.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WindowoperatorLoginComponent } from './windowoperator-login/windowoperator-login.component';
import { WindowoperatorHomeComponent } from './windowoperator-home/windowoperator-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddnewoperatorComponent } from './addnewoperator/addnewoperator.component';
import { HomeComponent } from './home/home.component';
import { DeleteOperatorComponent } from './delete-operator/delete-operator.component';
import { SearchModifyComponent } from './search-modify/search-modify.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { UserComponent } from './user/user.component';
import { MatTableModule } from '@angular/material/table';
import { EditoperatorComponent } from './editoperator/editoperator.component';
import { LivestatusComponent } from './livestatus/livestatus.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, GenerateTokenComponent, WindowoperatorLoginComponent
                 , WindowoperatorHomeComponent, AdminLoginComponent, AdminHomeComponent, AddnewoperatorComponent,
                 HomeComponent, DeleteOperatorComponent, SearchModifyComponent, UserComponent, EditoperatorComponent,
                 LivestatusComponent, AboutComponent, ContactComponent ],
  entryComponents: [AddnewoperatorComponent, EditoperatorComponent],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTableModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

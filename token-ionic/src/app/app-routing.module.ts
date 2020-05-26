import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GenerateTokenComponent } from './generate-token/generate-token.component';
import { WindowoperatorLoginComponent } from './windowoperator-login/windowoperator-login.component';
import { WindowoperatorHomeComponent } from './windowoperator-home/windowoperator-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddnewoperatorComponent } from './addnewoperator/addnewoperator.component';
import { HomeComponent } from './home/home.component';
import { DeleteOperatorComponent } from './delete-operator/delete-operator.component';
import { SearchModifyComponent } from './search-modify/search-modify.component';
import { UserComponent } from './user/user.component';
import { EditoperatorComponent } from './editoperator/editoperator.component';
import { LivestatusComponent } from './livestatus/livestatus.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'login', component: LoginComponent
  },

  {
    path: 'generate-token', component: GenerateTokenComponent
  },
  {
    path: 'windowoperatorlogin', component: WindowoperatorLoginComponent
  },
  {
    path: 'windowoperatorhome', component: WindowoperatorHomeComponent
  },
  {
    path: 'adminlogin', component: AdminLoginComponent
  },
  {
    path: 'adminhome', component: AdminHomeComponent
  },
  {
    path: 'addnewoperator', component: AddnewoperatorComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'deleteoperator', component: DeleteOperatorComponent
  },
  {
    path: 'searchmodify', component: SearchModifyComponent
  },
  {
    path: 'User', component: UserComponent
  },
  {
    path: 'editoperator', component: EditoperatorComponent
  },
  {
    path: 'livestatus', component: LivestatusComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

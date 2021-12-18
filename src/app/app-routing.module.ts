import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { UserReadComponent } from './components/user/user-read/user-read.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { WineCreateComponent } from './components/wine/wine-create/wine-create.component';
import { WineDeleteComponent } from './components/wine/wine-delete/wine-delete.component';
import { WineReadComponent } from './components/wine/wine-read/wine-read.component';
import { ReviewReadComponent } from './components/wine/wine-review/wine-review.component';
import { WineUpdateComponent } from './components/wine/wine-update/wine-update.component';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { TopRatedComponent } from "./views/top-rated/top-rated.component";
import { UsersCrudComponent } from './views/users-crud/users-crud.component';
import { WinesCrudComponent } from './views/wines-crud/wines-crud.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: "wines",
    component: WinesCrudComponent
  },
  {
    path: "wines/create",
    component: WineCreateComponent
  },
  {
    path: "wines/read",
    component: WineReadComponent
  },
  {
    path: "wines/delete/:id",
    component: WineDeleteComponent
  },
  {
    path: "wines/update/:id",
    component: WineUpdateComponent
  },
  {
    path: "wines/review/:id",
    component: ReviewReadComponent
  },
  {
    path: "users",
    component: UsersCrudComponent
  },
  {
    path: "users/create",
    component: UserCreateComponent
  },
  {
    path: "users/read",
    component: UserReadComponent
  },
  {
    path: "users/delete/:id",
    component: UserDeleteComponent
  },
  {
    path: "users/update/:id",
    component: UserUpdateComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "top/:id",
    component: TopRatedComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      // Home
      // { path: 'user', loadChildren: '../modules/user/user.module#UserModule'},
      // { path: 'store', loadChildren: '../modules/store/store.module#StoreModule'},
      // { path: 'shoe', loadChildren: '../modules/shoe/shoe.module#ShoeModule'},
      // { path: 'brand', loadChildren: '../modules/brand/brand.module#BrandModule'},
      // { path: 'shoes_length', loadChildren: '../modules/shoes-length/shoes-length.module#ShoesLengthModule'},
      // { path: 'shoes_width', loadChildren: '../modules/shoes-width/shoes-width.module#ShoesWidthModule'},
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

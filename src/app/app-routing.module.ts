import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './auth.guard';
import {RegisterComponent} from './register/register.component';
import {AdminComponent} from './admin/admin.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {CategoryComponent} from './category/category.component';
import {ProductComponent} from './product/product.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth/signin'},
  {path: 'auth/signin', component: AuthComponent},
  {path: 'auth/signup', component: RegisterComponent},
  {path: 'dolap/admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'category/add', component: CategoryComponent, canActivate: [AuthGuard]},
  {path: 'product/edit/:id', component: EditProductComponent, canActivate: [AuthGuard]},
  {path: 'product/add', component: ProductComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

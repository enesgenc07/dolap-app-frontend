import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {AdminComponent} from './admin/admin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {MatCardModule, MatDialogModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RegisterComponent} from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './auth.guard';
import {ToastrModule} from 'ngx-toastr';
import {authInterceptorProviders} from './auth.interceptor';
import {ProductService} from './services/product-service';
import {EditProductComponent} from './edit-product/edit-product.component';
import {CategoryService} from './services/category-service';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminComponent,
    RegisterComponent,
    EditProductComponent,
    CategoryComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    ToastrModule.forRoot({
      disableTimeOut: true,
      preventDuplicates: true,
      closeButton: true,
      tapToDismiss: false,
    }),
    MatDialogModule
  ],
  providers: [AuthService, AuthGuard, authInterceptorProviders, ProductService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

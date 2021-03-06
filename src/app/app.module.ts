import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { ColorDirective } from './directives/color.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomerComponent } from './components/customer/customer.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { CarImageEditComponent } from './components/car-image-edit/car-image-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    BrandComponent,
    ColorComponent,
    NaviComponent,
    CarComponent,
    RentalComponent,
    CarDetailsComponent,
    CarFilterPipePipe,
    BrandFilterPipePipe,
    ColorFilterPipePipe,
    PaymentComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    CarDeleteComponent,
    ColorUpdateComponent,
    ColorDeleteComponent,
    BrandUpdateComponent,
    BrandDeleteComponent,
    CarUpdateComponent,
    CarListComponent,
    BrandListComponent,
    ColorListComponent,
    RentalAddComponent,
    LoginComponent,
    RegisterComponent,
    UserUpdateComponent,
    ColorDirective,
    CarImageEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

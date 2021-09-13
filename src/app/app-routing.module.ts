import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarImageEditComponent } from './components/car-image-edit/car-image-edit.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/car/:carId', component: CarDetailsComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'rentals', component: RentalComponent },
  { path: 'rent/car/:carId', component: RentalAddComponent, canActivate:[LoginGuard] },
  { path: 'brands/list', component: BrandListComponent, canActivate:[LoginGuard] },
  { path: 'brands/add', component: BrandAddComponent, canActivate:[LoginGuard] },
  { path: 'brands/delete/:brandId', component: BrandDeleteComponent, canActivate:[LoginGuard] },
  { path: 'brands/update/:brandId', component: BrandUpdateComponent, canActivate:[LoginGuard] },
  { path: 'colors/list', component: ColorListComponent, canActivate:[LoginGuard] },
  { path: 'colors/add', component: ColorAddComponent, canActivate:[LoginGuard] },
  { path: 'colors/delete/:colorId', component: ColorDeleteComponent, canActivate:[LoginGuard] },
  { path: 'colors/update/:colorId', component: ColorUpdateComponent, canActivate:[LoginGuard] },
  { path: 'cars/list', component: CarListComponent, canActivate:[LoginGuard] },
  { path: 'cars/add', component: CarAddComponent, canActivate:[LoginGuard] },
  { path: 'cars/delete/:carId', component: CarDeleteComponent, canActivate:[LoginGuard] },
  { path: 'cars/update/:carId', component: CarUpdateComponent, canActivate:[LoginGuard] },
  { path: 'payment/car/:carId/Start/:rentDate/End/:returnDate', component: PaymentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/update', component: UserUpdateComponent, canActivate:[LoginGuard] },
  { path: 'cars/edit/images/:carId', component: CarImageEditComponent, canActivate:[LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

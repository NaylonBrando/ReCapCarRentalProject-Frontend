import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/car/:carId', component: CarDetailsComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'rentals', component: RentalComponent },
  { path: 'rent/car/:carId', component: RentalAddComponent },
  { path: 'brands/list', component: BrandListComponent },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'brands/delete/:brandId', component: BrandDeleteComponent },
  { path: 'brands/update/:brandId', component: BrandUpdateComponent },
  { path: 'colors/list', component: ColorListComponent },
  { path: 'colors/add', component: ColorAddComponent },
  { path: 'colors/delete/:colorId', component: ColorDeleteComponent },
  { path: 'colors/update/:colorId', component: ColorUpdateComponent },
  { path: 'cars/list', component: CarListComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'cars/delete/:carId', component: CarDeleteComponent },
  { path: 'cars/update/:carId', component: CarUpdateComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

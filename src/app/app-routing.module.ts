import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent}, 
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/car/:carId", component:CarDetailsComponent},
  {path:"customers", component:CustomerComponent},
  {path:"rentals", component:RentalComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
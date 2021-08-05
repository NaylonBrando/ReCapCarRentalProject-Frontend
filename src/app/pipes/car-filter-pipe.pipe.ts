import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'carFilterPipe',
})
export class CarFilterPipePipe implements PipeTransform {
  transform(value: Car[], filterText: string): Car[] {
    if(!filterText){
      return value;
    }
    return value.filter((c:Car)=>
    c.carName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) ||
    c.colorName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) ||
    c.colorName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) ||
    c.brandName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) ||
    c.modelYear.toString().toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) ||
    c.dailyPrice.toString().toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
    );
  }
}

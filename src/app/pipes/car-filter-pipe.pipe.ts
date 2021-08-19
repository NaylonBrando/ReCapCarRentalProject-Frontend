import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'carFilterPipe',
})
export class CarFilterPipePipe implements PipeTransform {
  transform(value: CarDetail[], filterText: string): CarDetail[] {
    if(!filterText){
      return value;
    }
    return value.filter((c:CarDetail)=>
    c.carName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) ||
    c.colorName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) ||
    c.colorName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) ||
    c.brandName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) ||
    c.modelYear.toString().toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) ||
    c.dailyPrice.toString().toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
    );
  }
}

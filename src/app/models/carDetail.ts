export interface CarDetail {
  //Dikkat bu özelliklerin bazilari backenddeki car sınıfında yok, bunlar CarDetailDto'dan geliyor.
  //Bu interface CarDetailDto'ya göre ayarlanmis
  carId: number;
  carName: string;
  brandId: number;
  colorId: number;
  fuelId: number;
  gearId: number;
  brandName: string;
  colorName: string;
  gearName:string;
  fuelName:string;
  modelYear: number;
  dailyPrice: number;
  description: string;
  score:number;
  firstCarImage: string;
}

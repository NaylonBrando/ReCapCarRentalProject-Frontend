import { CarImage } from "./carImage";
export interface SingleCarDetail{
    carId:number,
    brandId:number,
    colorId:number,
    gearId:number,
    fuelId:number,
    carName:string,
    brandName:string,
    colorName:string,
    gearName:string,
    fuelName:string,
    modelYear:number,
    dailyPrice:number,
    description:string,
    score:number,
    firstCarImage:string,
    carImage:CarImage[]
}
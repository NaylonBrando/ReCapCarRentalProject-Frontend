import { CarImage } from "./carImage";
export interface SingleCarDetail{
    carId:number,
    brandId:number,
    colorId:number,
    carName:string,
    brandName:string,
    colorName:string,
    modelYear:number,
    dailyPrice:number,
    description:string,
    firstCarImage:string,
    carImage:CarImage[]
}
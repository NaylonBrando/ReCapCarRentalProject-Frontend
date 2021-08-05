import { CarImage } from "./carImage";
export interface CarDetails{
    carName:string
    brandName:string,
    colorName:string,
    modelYear:number,
    dailyPrice:number,
    description:string,
    carImage:CarImage[]
}
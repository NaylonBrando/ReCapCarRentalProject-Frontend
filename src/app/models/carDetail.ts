export interface CarDetail{
    //Dikkat bu özelliklerin bazilari backenddeki car sınıfında yok, bunlar CarDetailDto'dan geliyor. 
    //Bu interface CarDetailDto'ya göre ayarlanmis
    carId:number,
    carName:string,
    brandId:number,
    colorId:number,
    brandName:string,
    colorName:string,
    modelYear:number,
    dailyPrice:number,
    description:string,
    firstCarImage:string 
}
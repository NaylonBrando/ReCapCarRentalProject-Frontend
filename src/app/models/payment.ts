export interface Payment {
  id?:number,
  customerId: number;
  cardId?: number;
  carId:number
  cardNumber:string
  date: Date;
  totalPayment: number;
}

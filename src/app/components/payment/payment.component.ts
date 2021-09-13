import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCardAddModel } from 'src/app/models/creditcardAddModel';
import { Customer } from 'src/app/models/customer';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { RentalCheck } from 'src/app/models/rentalCheck';
import { SingleCarDetail } from 'src/app/models/singleCarDetail';
import { CreditCardService } from 'src/app/services/creditcard.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { SingleCarDetailService } from 'src/app/services/single-car-details.service';
import { UserService } from 'src/app/services/user.service';
import { CarDetailsComponent } from '../car-details/car-details.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  carId: any;
  rentDate: Date;
  returnDate: Date;
  car: SingleCarDetail;
  userId: number;
  customers:Customer[]
  
  date: Date;
  rentallist: Rental[];
  rentalSguccess: boolean;
  rentalMessage: string;
  result: Rental;
  checkboxStatus: boolean = false;
  paymentValue: number;
  sumRentDays: number;

  choice: boolean = false;

  creditCartForm: FormGroup;
  invidualCustomerAddForm: FormGroup;
  corporateCustomerAddForm: FormGroup;

  defaultPath = 'https://localhost:44365';
  customerId: any;


  

  constructor(
    private creditCardService: CreditCardService,
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private singlecarDetailService: SingleCarDetailService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        (this.carId = parseInt(params['carId'])),
          (this.rentDate = params['rentDate']),
          (this.returnDate = params['returnDate']);
        this.checkRentalDate();
        this.getCarDetailsById(params['carId']);
        this.getUserId();
        this.createInvidualCustomerAddForm();
        this.createCorporateCustomerAddForm();
        this.createCreditCartForm();
      }
    });
  }

  getUserId(){
    this.userService.getByMail(this.localStorageService.getCurrentUserEmail()).subscribe(response=>{
      this.userId = response.data.id;
    })
  }

  createCreditCartForm() {
    this.creditCartForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cardNumber: ['', [Validators.required,  Validators.minLength(16), Validators.maxLength(16)]],
      expirationDate: ['', Validators.required],
      ccv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    });
  }

  createInvidualCustomerAddForm() {
    this.invidualCustomerAddForm = this.formBuilder.group({
      userId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identificationNumber: ['', [Validators.required, Validators.minLength(11),Validators.maxLength(11)]],
    });
  }

  createCorporateCustomerAddForm() {
    this.corporateCustomerAddForm = this.formBuilder.group({
      userId: ['', Validators.required],
      companyName: ['', Validators.required],
      taxNumber: ['', [Validators.required,  Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  getCarDetailsById(carId: number) {
    this.singlecarDetailService
      .getCarDetailsById(carId)
      .subscribe((response) => {
        this.car = response.data;
        let sakla1 = Date.parse(this.rentDate.toString());
        let sakla2 = Date.parse(this.returnDate.toString());
        let sakla3 = sakla2 - sakla1;
        this.sumRentDays = sakla3 / (1000 * 60 * 60 * 24) + 1;
        this.paymentValue = this.car.dailyPrice * this.sumRentDays;
      });
  }
  //carıd, cusId, rentd, returndate
  

  checkRentalDate() {
    let model = Object.assign({
      carId: this.carId,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
    });
    this.rentalService.rentalCheck(model).subscribe(
      (response) => {
        if (!response.success) {
          let control = response;
          control.success;
          this.toastrService.warning(
            this.rentDate +
              '-----' +
              this.returnDate +
              ' aralığında bu arac kiralanmistir, tekrar tarih araligi seciniz'
          );
          this.router.navigate(['cars/car/' + this.carId]);
        }
      },
      (responseError) => {
        this.toastrService.error(responseError.error);
      }
    );
  }

  getCustomersById(){

  }

  


  
//spagetti oldu, ilerde business rules engine gibi bir seyde refactor edilecek
  completeReservation() {
    if (this.choice) { //bireysel müsteriler icin
      if(this.invidualCustomerAddForm.valid){
        let invidualModel = Object.assign({}, this.invidualCustomerAddForm.value);
        this.customerService.add(invidualModel).subscribe((response) => {
        if (!response.success) {
          this.toastrService.error('Müsteri eklenemedi!');
        } else {
          this.toastrService.info(response.message);
          this.customerService
            .getLastCustomerByUserId(this.userId)
            .subscribe((customerResponse) => {
              if (!customerResponse.success) {
                this.toastrService.error('Son müsteri datasi getirilemedi!');
              } else {
                this.customerId = customerResponse.data.id
                if (this.checkboxStatus) { //kredi karti kaydedilsin
                  let creditCardModel = Object.assign(
                    {},
                    this.creditCartForm.value
                  );
                  creditCardModel.customerId = this.customerId
                  this.creditCardService
                    .add(creditCardModel)
                    .subscribe((creditCardAddResponse) => {
                      if (!creditCardAddResponse) {
                        this.toastrService.error('Kredi karti eklenemedi');
                      } else {
                        this.creditCardService.getByCustomerId(customerResponse.data.id).subscribe((creditCardDataResponse)=>{
                          this.toastrService.success('Kart eklendi');
                          if (!creditCardDataResponse.success) {
                            this.toastrService.error('Kredi karti datasi getirilemedi');
                          }
                          else{
                            let datenow = new Date
                            let payment:Payment={
                              carId:this.carId,
                              cardId:creditCardDataResponse.data.id,
                              cardNumber:null,//kredi karti kaydedilenlerde güvenlik icin null
                              customerId:this.customerId,
                              date:datenow,
                              totalPayment:this.paymentValue,
                            }
                            this.paymentService.addPayment(payment).subscribe((paymentResponse)=>{
                              if(!paymentResponse.success){}
                              else{
                                this.toastrService.success("Ödeme Yapildi!")
                                let rentalModel:Rental ={carId:this.carId,
                                  customerId:customerResponse.data.id,
                                  rentDate:this.rentDate, 
                                  returnDate:this.returnDate }

                                this.rentalService.add(rentalModel).subscribe((rentalAddResponse)=>{
                                  if (!rentalAddResponse) {
                                    this.toastrService.error(rentalAddResponse.message)
                                  }
                                  else{
                                    this.toastrService.success(rentalAddResponse.message) 
                                    this.router.navigate(['cars/car/' + this.carId]);
                                  }
                                })
                              }
                            })
                          }
                        })
                      }
                    });
                }
                else{ //kredi karti kaydedilmesin
                  let creditCardModel = Object.assign(
                    {},
                    this.creditCartForm.value
                  );

                  let sliced = creditCardModel.cardNumber.slice(0, 4);
                  let sliced2 = creditCardModel.cardNumber.slice(12, 16);
                  
                  creditCardModel.cardNumber = sliced + "************" + sliced2;

                  let datenow = new Date
                  let payment:Payment={
                    carId:this.carId, 
                    cardId:null,
                    cardNumber:creditCardModel.cardNumber,
                    customerId:this.customerId,
                    date:datenow,
                    totalPayment:this.paymentValue,
                  }
                  this.paymentService.addPayment(payment).subscribe((paymentResponse)=>{
                    if(!paymentResponse.success){}
                    else{
                      this.toastrService.success("Ödeme Yapildi!")
                      let rentalModel:Rental ={carId:this.carId,
                        customerId:customerResponse.data.id,
                        rentDate:this.rentDate, 
                        returnDate:this.returnDate }

                      this.rentalService.add(rentalModel).subscribe((rentalAddResponse)=>{
                        if (!rentalAddResponse) {
                          this.toastrService.error(rentalAddResponse.message)
                        }
                        else{
                          this.toastrService.success(rentalAddResponse.message)
                          this.router.navigate(['cars/car/' + this.carId]);
                        }
                      })
                    }
                  })       
                }
              }
            });
        }
      });
    }
    else{
      this.toastrService.error("invidual valid degil")
    }
      }
       else { //kurumsal müsteriler icin
      
      if(this.corporateCustomerAddForm.valid){
        let corporateModel = Object.assign({}, this.corporateCustomerAddForm.value);
        this.customerService.add(corporateModel).subscribe((response) => {
          if (!response.success) {
            this.toastrService.error('Müsteri eklenemedi!');
          } else {
            this.toastrService.info(response.message);
            this.customerService
              .getLastCustomerByUserId(this.userId)
              .subscribe((customerResponse) => {
                if (!customerResponse.success) {
                  this.toastrService.error('Son müsteri datasi getirilemedi!');
                } else {
                  this.customerId = customerResponse.data.id
                  //this.toastrService.success(customerResponse.data.identificationNumber + "getirildi" + this.customerId);
                  if (this.checkboxStatus) { //kredi karti kaydedilsin
                    let creditCardModel = Object.assign(
                      {},
                      this.creditCartForm.value
                    );
                    creditCardModel.customerId = this.customerId
                    this.creditCardService
                      .add(creditCardModel)
                      .subscribe((creditCardAddResponse) => {
                        if (!creditCardAddResponse) {
                          this.toastrService.error('Kredi karti eklenemedi');
                        } else {
                          this.creditCardService.getByCustomerId(customerResponse.data.id).subscribe((creditCardDataResponse)=>{
                            this.toastrService.success('Kart eklendi');
                            if (!creditCardDataResponse.success) {
                              this.toastrService.error('Kredi karti datasi getirilemedi');
                            }
                            else{
                              let datenow = new Date
                              let payment:Payment={
                                carId:this.carId,
                                cardId:creditCardDataResponse.data.id,
                                cardNumber:null,//kredi karti kaydedilenlerde güvenlik icin null
                                customerId:this.customerId,
                                date:datenow,
                                totalPayment:this.paymentValue,
                              }
                              this.paymentService.addPayment(payment).subscribe((paymentResponse)=>{
                                if(!paymentResponse.success){}
                                else{
                                  this.toastrService.success("Ödeme Yapildi!")
                                  let rentalModel:Rental ={carId:this.carId,
                                    customerId:customerResponse.data.id,
                                    rentDate:this.rentDate, 
                                    returnDate:this.returnDate }
  
                                  this.rentalService.add(rentalModel).subscribe((rentalAddResponse)=>{
                                    if (!rentalAddResponse) {
                                      this.toastrService.error(rentalAddResponse.message)
                                    }
                                    else{
                                      this.toastrService.success(rentalAddResponse.message) 
                                      this.router.navigate(['cars/car/' + this.carId]);
                                    }
                                  })
                                }
                              })
                            }
                          })
                        }
                      });
                  }
                  else{ //kredi karti kaydedilmesin
                    let creditCardModel = Object.assign(
                      {},
                      this.creditCartForm.value
                    );
  
                    let sliced = creditCardModel.cardNumber.slice(0, 4);
                    let sliced2 = creditCardModel.cardNumber.slice(12, 16);
                    
                    creditCardModel.cardNumber = sliced + "************" + sliced2;
  
                    let datenow = new Date
                    let payment:Payment={
                      carId:this.carId, 
                      cardId:null, //carId'ye null diyemiyoruz, null deyince api tetiklenmiyor. deger vermezsek de 0 olarak kabul ediyor
                      cardNumber:creditCardModel.cardNumber,
                      customerId:this.customerId,
                      date:datenow,
                      totalPayment:this.paymentValue,
                    }
                    this.paymentService.addPayment(payment).subscribe((paymentResponse)=>{
                      if(!paymentResponse.success){}
                      else{
                        this.toastrService.success("Ödeme Yapildi!")
                        let rentalModel:Rental ={carId:this.carId,
                          customerId:customerResponse.data.id,
                          rentDate:this.rentDate, 
                          returnDate:this.returnDate }
  
                        this.rentalService.add(rentalModel).subscribe((rentalAddResponse)=>{
                          if (!rentalAddResponse) {
                            this.toastrService.error(rentalAddResponse.message)
                          }
                          else{
                            this.toastrService.success(rentalAddResponse.message)
                            this.router.navigate(['cars/car/' + this.carId]);
                          }
                        })
                      }
                    })       
                  }
                }
              });
          }
        });
      }
    }
  }

  onItemChange(choice: boolean) {
    this.choice = choice;
  }

}

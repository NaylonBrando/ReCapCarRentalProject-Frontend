import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditcard';
import { Rental } from 'src/app/models/rental';
import { CreditCardService } from 'src/app/services/creditcard.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  @Input() carId: any;
  @Input() rentDate: Date;
  @Input() returnDate: Date;
  @Input() totalRentValue: number;
  userId: any;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  creditCards: CreditCard[] = [];
  date: Date;
  cardInHand: CreditCard = {
    id: 0,
    userId: 0,
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  };
  rentallist: Rental[];
  rentalSuccess: boolean;
  rentalMessage: string;
  result: Rental;

  constructor(
    private creditCardService: CreditCardService,
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCreditCards();
    });
    this.getRentals();
  }

  deneme() {
    this.cardInHand = this.creditCards.find((c) => c.userId == this.userId)!;
    console.log(this.cardInHand);
  }

  getCreditCards() {
    this.creditCardService.getCards().subscribe((card) => {
      this.creditCards = card.data;
    });
  }

  checkTheCreditCard() {
    let creditcard = {
      userId: parseInt(this.userId),
      cardNumber: this.cardNumber,
      expirationDate: this.expirationDate,
      cvv: this.cvv,
    };
    this.creditCardService.checkTheCreditCard(creditcard).subscribe(
      (response) => {
        if (response.success) {
          this.toastrService.info('Kart bilgileri doğru.');
          //this.toastrService.clear();
          let newrenttime = this.rentDate;

          this.getLastRental(this.carId).subscribe((response) => {
            this.result = response.data;
            if (this.result) {
              if (this.result.returnDate > this.rentDate) {
                this.toastrService.error(
                  'Bu tarihte zaten araba kiralanmis, tekrar tarih seciniz.'
                );
                //this.toastrService.clear();
              } else {
                this.addRental().subscribe((response) => {
                  let rentStatus = response.success;
                  if (rentStatus == true) {
                    this.toastrService.success('Kiralama işlemi başarılı');
                    //this.toastrService.clear();

                    this.addPayment().subscribe((response) => {
                      let paymentStatus = response.success;

                      if (paymentStatus == true) {
                        this.toastrService.success('Ödeme islemi başarılı');
                        //this.toastrService.clear();
                      } else {
                        this.toastrService.error('Ödeme işlemi başarısız');
                        //this.toastrService.clear();
                      }
                    });
                  } else {
                    this.toastrService.error('Kiralama işlemi başarısız');
                    //this.toastrService.clear();
                  }
                });
              }
            } else {
              this.addRental().subscribe((response) => {
                let rentStatus = response.success;
                if (rentStatus == true) {
                  this.toastrService.success('Kiralama işlemi başarılı');
                  //this.toastrService.clear();

                  this.addPayment().subscribe((response) => {
                    let paymentStatus = response.success;

                    if (paymentStatus == true) {
                      this.toastrService.success('Ödeme islemi başarılı');
                      //this.toastrService.clear();
                    } else {
                      this.toastrService.error('Ödeme işlemi başarısız');
                      //this.toastrService.clear();
                    }
                  });
                } else {
                  this.toastrService.error('Kiralama işlemi başarısız');
                  //this.toastrService.clear();
                }
              });
            }
          });
        }
      },
      (error) => {
        console.log(error.error);
        if (error !== null) {
          this.toastrService.error('Kart bilgileri yanlış.');
          //this.toastrService.clear();
        }
      }
    );
  }

  addPayment() {
    this.cardInHand = this.creditCards.find((c) => c.userId == this.userId)!;
    let payment = {
      userId: parseInt(this.userId),
      cardId: this.cardInHand.id!,
      date: this.date,
      totalPayment: this.totalRentValue,
    };
    return this.paymentService.addPayment(payment);
  }

  addRental() {
    let rental = {
      carId: parseInt(this.carId),
      customerId: parseInt(this.userId),
      rentDate: this.rentDate,
      returnDate: this.returnDate,
    };
    return this.rentalService.add(rental);
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentallist = response.data;
    });
  }

  getLastRental(carId: number) {
    return this.rentalService.getLastRental(this.carId);
  }
}

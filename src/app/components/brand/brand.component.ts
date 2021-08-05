import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand:Brand;
  constructor(private brandservice: BrandService) {}

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this.brandservice.getAllBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  setCurrentBrand(brand: Brand) {
    this.currentBrand=brand;
  }

  getCurrentBrand(brand:Brand){
    if(brand==this.currentBrand){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordAgain:['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onSubmit(){
    alert(JSON.stringify(this.registerForm.value));
  }

  register() {
    if (this.registerForm.valid) {
      let model = Object.assign({}, this.registerForm.value);
      if(model.password==model.passwordAgain){
        this.authService.register(model).subscribe(
          (response) => {
            this.toastrService.success('Kayit basarili, ana sayfaya yönlendirliyorsunuz');
            this.localStorageService.setToken(response.data);
            this.router.navigate(['']);
          },
          (responseError) => {
            this.toastrService.error(responseError.error);
          }
        );
      }
      else{
        this.toastrService.warning('Sifreler uyusmadi');
     }
     
    } else {
      this.toastrService.warning('Eksik bilgi girdiniz');
    }
  }
}

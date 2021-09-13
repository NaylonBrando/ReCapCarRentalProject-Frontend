import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user:User
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router:Router,
    private localStorageService:LocalStorageService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getUser(email:string){
    this.userService.getByMail(email).subscribe(response=>{
      this.user = response.data;
      this.localStorageService.setCurrentUser(this.user.firstName, this.user.lastName);
      this.localStorageService.setCurrentUserEmail(this.user.email);
    })
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(
        (response) => {
          this.toastrService.success("Kullanıcı bilgileri doğru, ana sayfaya yönlendiriliyorsunuz");
          this.localStorageService.setToken(response.data)
          this.getUser(loginModel.email)
          this.router.navigate([""]);      
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
    else{
      this.toastrService.warning("Eksik giriş bilgisi girdiniz");
    }
  }
}

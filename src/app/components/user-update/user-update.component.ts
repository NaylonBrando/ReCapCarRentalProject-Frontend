import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  userUpdateForm: FormGroup;
  passwordChangeForm: FormGroup;
  id: number;
  user: User;
  firstName: string;
  lastName: string;
  email: string;
  haslipassword: number[];
  test: string;
  password: string = '';
  oldPassword: string ='';
  newPassword: string ='';
  newPasswordAgain: string ='';
  passwordFormBody: boolean;

  //user datayi(sadece isim, sosyisim, eposta) getir, önce inputlara user datayi koy
  //profili güncellemek icin mevcut sifreyle kayit yaptir
  //sifrede güncellenmek istiyorsa yeni sifreyide parametre olarak yolla

  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.createUserForm();
    this.createPasswordForm();
  }

  createUserForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [Validators.required],
      firstName: [Validators.required],
      lastName: [Validators.required],
      email: [Validators.required],
      password: [Validators.required],
    });
  }

  createPasswordForm() {
    this.passwordChangeForm = this.formBuilder.group({
      id:[Validators.required],
      oldPassword:[Validators.required],
      newPassword:[Validators.required],
      newPasswordAgain:[Validators.required],
    });
  }

  getUserData() {
    this.userService
      .getByMail(this.localStorageService.getCurrentUserEmail())
      .subscribe((response) => {
        this.user = response.data;
        this.id = this.user.id;
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.email = this.user.email;
      });
  }

  update() {
    ///burada hem yeni token hemde yeni currentuser, hem currentuseremail
    if (this.userUpdateForm.valid) {
      let model = Object.assign({}, this.userUpdateForm.value);
      if (!this.firstName || !this.lastName || !this.email) {
        this.toastrService.error(
          'İsim, Soyisim ve E posta bilgileri bos gecilemez'
        );
      } else {
        if (this.password == '') {
          this.toastrService.error('Güncellemek icin sifreyi giriniz');
        } else {
          this.authService.update(model).subscribe(
            (response) => {
              this.toastrService.success('Güncellendi');
              this.localStorageService.setToken(response.data);
              this.localStorageService.setCurrentUser(
                model.firstName,
                model.lastName
              );
              this.localStorageService.setCurrentUserEmail(model.email);
            },
            (responseError) => {
              this.toastrService.error(responseError.error);
            }
          );
        }
      }
    }
  }

  updatePassword() {
    if (this.passwordChangeForm.valid) {
      let model = Object.assign({}, this.passwordChangeForm.value);
      if (!this.newPassword || !this.newPasswordAgain  && this.newPassword==this.newPasswordAgain) {
        this.toastrService.error(
          'Yeni sifre bos gecilemez. Yeni sifre parametreleri ayni olmalidir.'
        );
      } else {
        if (this.oldPassword == '') {
          this.toastrService.error('Güncellemek icin eski sifreyi giriniz');
        } else {
          this.authService.updatePassword(model).subscribe(
            (response) => {
              this.toastrService.success('Güncellendi');
              this.localStorageService.setToken(response.data);
            },
            //Eger sifre yanliş ise bu döner. Backendden gelen veriden hata mesaji vardir.
            (responseError) => {
              this.toastrService.error(responseError.error);
            }
          );
        }
      }
    }
  }
  updatePasswordFormBody(boolean: boolean) {
    if (boolean == true) {
      this.passwordFormBody = true;
    } else {
      this.passwordFormBody = false;
      this.getUserData();
    }
  }
}

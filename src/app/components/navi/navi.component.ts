import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  currentUser: string;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.localStorageService.getCurrentUser();
  }

  isLogged() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    this.localStorageService.removeCurrentUser();
    this.localStorageService.removeToken();
    this.localStorageService.removeCurrentUserEmail();
    this.toastrService.info("Basariyla çıkış yapıldı. Anasayfaya yönendiriliyorsunuz");
    this.router.navigate([""]);
  }
}

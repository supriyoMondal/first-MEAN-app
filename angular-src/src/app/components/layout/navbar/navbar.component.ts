import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  login: String = "Login"
  register: String = "Register"
  home: string = "Home"
  token;
  constructor(private router: Router,
    private authService: AuthService,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('x-auth-token');

  }




  onLogout() {
    this.authService.logout();
    this.flashMessage.show("You have been logged out.", {
      cssClass: "alert-success", timeout: 3000
    });
    this.router.navigate(['/']);
    return;
  }

}

import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private validateService: ValidateService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.storeUserData().subscribe(
      (res) => {
        this.router.navigate(['/dashboard']);
      }
    )
  }
  onLoginSubmit() {
    if (this.email == undefined || this.email.length == 0 || this.password == undefined || this.password.length == 0 ||
      !this.validateService.validateEmail(this.email)) {
      this.flashMessage.show("Please enter valid credentials.", { cssClass: "alert-danger", timeOut: 4000 })
      return;
    }
    const user = {
      email: this.email,
      password: this.password
    }
    this.authService.loginUser(user).subscribe((res) => {
      this.flashMessage.show("You are registered successfully.", { cssClass: "alert-success", timeout: 3000 });
      localStorage.setItem('x-auth-token', res.token);
    },
      (err) => {
        let message;
        message = err.error.errors[0].msg;
        this.flashMessage.show(message, { cssClass: "alert-danger", timeout: 4000 })
        return;
      },
      () => {
        this.router.navigate(['/dashboard']);
        return;

      })
  }



}

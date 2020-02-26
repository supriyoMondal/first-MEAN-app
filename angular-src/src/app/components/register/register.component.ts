import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string
  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.storeUserData().subscribe(
      (res) => {
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        return;
      }
    )
  }
  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      username: this.username,
    }
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show("Enter all the fields", { cssClass: 'alert-danger', timeout: 3000 });
      return;
    } else if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Enter a valid email", { cssClass: 'alert-danger', timeout: 3000 });
      return;
    } else if (!this.validateService.validatePassword(user)) {
      this.flashMessage.show("Enter a valid password", { cssClass: 'alert-danger', timeout: 3000 });
      return;

    } else if (!this.validateService.matchPassword(user, this.confirmPassword)) {
      this.flashMessage.show("Password don't match", { cssClass: 'alert-danger', timeout: 3000 });
      return;
    }
    //register user
    this.authService.registerUser(user).subscribe((res) => {
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

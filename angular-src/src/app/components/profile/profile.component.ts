import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.storeUserData().subscribe(user => {
      this.user = user;

    }, err => {
      this.router.navigate(['/']);
    });
  }

}

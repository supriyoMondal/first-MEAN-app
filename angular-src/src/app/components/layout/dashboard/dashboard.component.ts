import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'
import { Router } from "@angular/router"
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.storeUserData().subscribe(user => {
      console.log(user);
      this.authService.isRegistered = true;
    },
      err => {
        this.router.navigate(['/login']);
        return;
      })
  }

}

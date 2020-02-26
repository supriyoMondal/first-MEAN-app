import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  validateRegister(user) {
    if (user.name == undefined || user.name.length == 0 ||
      user.username == undefined || user.username.length == 0 ||
      user.password == undefined || user.password.length == 0 ||
      user.email == undefined || user.email.length == 0
    ) {
      return false;
    }
    return true;
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validatePassword(user) {
    if (user.password == undefined || user.password.length < 6) {
      return false;
    }
    return true;
  }
  matchPassword(user, password) {
    if (user.password == undefined || password == undefined || user.password != password) {
      return false;
    }
    return true;
  }
}

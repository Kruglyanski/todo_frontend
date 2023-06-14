import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, take, tap } from 'rxjs';
import { IUserDto } from '../models/dto/user.dto';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  register(userDto: IUserDto): Subscription {
    return this.apiService
      .registerGQL(userDto)
      .pipe(take(1))
      .subscribe((resp) => {
        const token = resp.data.registration.token;
        this.apiService.token$.next(token);
        localStorage.setItem('token', token);
      });
  }

  login(userDto: IUserDto): Subscription {
    return this.apiService
      .loginGQL(userDto)
      .pipe(take(1))
      .subscribe((resp) => {
        const token = resp.data.login.token;
        this.apiService.token$.next(token);
        localStorage.setItem('token', token);
      });
  }
}

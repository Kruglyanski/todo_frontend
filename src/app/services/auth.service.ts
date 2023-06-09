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
      .register(userDto)
      .pipe(take(1))
      .subscribe((resp) => {
        this.apiService.token$.next(resp.token);
        localStorage.setItem('token', resp.token);
      });
  }

  login(userDto: IUserDto): Subscription {
    return this.apiService
      .login(userDto)
      .pipe(take(1))
      .subscribe((resp) => {
        this.apiService.token$.next(resp.token);
        localStorage.setItem('token', resp.token);
      });
  }
}

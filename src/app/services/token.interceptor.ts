// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest,
// } from '@angular/common/http';
// import { AuthService } from './auth.service';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler) {
//     // Получите токен из вашего сервиса
//     const token = this.authService.getToken();
//     console.log('asd token', token);
//     // Клонируйте и измените запрос, добавив токен в хедер Authorization
//     const modifiedRequest = request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // Передайте измененный запрос дальше
//     return next.handle(modifiedRequest);
//   }
// }

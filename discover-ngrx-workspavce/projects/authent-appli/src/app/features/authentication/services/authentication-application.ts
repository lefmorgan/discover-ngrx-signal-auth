import { Injectable, Signal, effect, inject } from '@angular/core';
import { AuthenticationStore } from '../store';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationApplication {
  private readonly store = inject(AuthenticationStore);
  private readonly router = inject(Router);

  private redirectToLoginEffect = effect(() => {
    if(this.store.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  });
  
  login(login: string, password: string) {
    this.store.logIn({ login, password})
  }

  get isLoading(): Signal<boolean> {
     return this.store.isLoading;
  }
}

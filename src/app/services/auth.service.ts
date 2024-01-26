import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERNAME_KEY = 'app_username';

  constructor() { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.USERNAME_KEY);
  }

  login(username: string): void {
    localStorage.setItem(this.USERNAME_KEY, username);
  }

  logout(): void {
    localStorage.removeItem(this.USERNAME_KEY);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }
  
}

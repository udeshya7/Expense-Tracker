// src/app/core/services/auth.service.ts

import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth();
  currentUser: any;

  constructor(private router: Router) {}

  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Login successful:', userCredential.user);
      // Redirect or store user info as needed
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Handle errors as necessary
    }
  }

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      console.log('Google sign-in successful:', user);
      // Redirect or store user info as needed
    } catch (error) {
      console.error('Google sign-in failed:', error);
      throw error; // Handle errors as necessary
    }
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }
}
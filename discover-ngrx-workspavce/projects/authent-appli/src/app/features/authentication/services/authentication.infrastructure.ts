import { Injectable, inject } from '@angular/core';
import { AuthenticationStore } from '../store';
import { Observable } from 'rxjs';
import { AuthenticationUser } from '../models/authentication-user';

@Injectable({ providedIn: 'root' })
export class authenticationInfrastructure {
    login(email: string, password: string): Observable<AuthenticationUser> {
        throw new Error('Not implemented exception')
    }
}
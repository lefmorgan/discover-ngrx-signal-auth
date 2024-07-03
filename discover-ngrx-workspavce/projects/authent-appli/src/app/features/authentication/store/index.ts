import { signal } from "@angular/core";
import { AuthenticationUser } from "../models/authentication-user";
import { signalStore, withState } from "@ngrx/signals";

// 1. Etat à créeer
export interface AuthenticationState {
    user: AuthenticationUser | undefined | null;
    isLoading: boolean;
}

// 2. Valeur Initial
const initialValue: AuthenticationState = {
    user: undefined,
    isLoading: false
}

// 3. Reducer / store ...
export const AuthenticationStore = signalStore(
    { providedIn: 'root' },
    withState(initialValue)
)
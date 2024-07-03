import { computed, inject, signal } from "@angular/core";
import { AuthenticationUser } from "../models/authentication-user";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { concatMap, pipe, tap } from "rxjs";
import { authenticationInfrastructure } from "../services/authentication.infrastructure";
import { tapResponse } from '@ngrx/operators'

// 1. Etat à créeer
export interface AuthenticationState {
    user: AuthenticationUser | undefined | null;
    isLoading: boolean;
}

export type AuthenticateType = {
    login: string;
    password: string
}
// 2. Valeur Initial
const initialValue: AuthenticationState = {
    user: undefined,
    isLoading: false
}

// 3. Reducer / store ...
export const AuthenticationStore = signalStore(
    { providedIn: 'root' },
    withState(initialValue),
    withComputed(store => ({
        isAuthenticated: computed(() => store.user() !== undefined)
    })),
    withMethods((store, infra = inject(authenticationInfrastructure)) => (
        {
            logIn: rxMethod<AuthenticateType>(
                pipe(
                    tap( () => patchState(store, { isLoading: true})),
                    concatMap(input => {
                        return infra.login(input.login, input.password).pipe(
                            tapResponse({
                                next: user => patchState(store, { isLoading: false, user }),
                                error: () => patchState(store, { isLoading: false})
                            })
                        )
                    })
                )
            )
        }
    ))
)
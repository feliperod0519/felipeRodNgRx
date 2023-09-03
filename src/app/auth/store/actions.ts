import {createAction, props, createActionGroup, emptyProps} from '@ngrx/store';
import { BackendErrorsInterface } from 'src/app/shared/types/backEndErrors.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';

export const authActions = createActionGroup({
    source: 'auth',
    events: {
        Register: props<{request: RegisterRequestInterface}>(),
        'Register success': props<{currentUser:CurrentUserInterface}>(),
        'Register failure': props<{errors: BackendErrorsInterface}>()
    }
})

// Replaces the following code.
// export const register = createAction('[Auth] Register',props<{request:RegisterRequestInterface}>())
// export const registerSuccess = createAction('[Auth] Register success',props<{request:RegisterRequestInterface}>())
// export const registerFailure = createAction('[Auth] Register failure',props<{request:RegisterRequestInterface}>())
import { CommonModule } from '@angular/common';
import {Component} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import { RouterLink } from '@angular/router';
import {Store} from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { authActions } from '../../store/actions';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { AuthStateInterface } from '../../types/authState.interface';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { combineLatest } from 'rxjs';
import { BackendErrorsMessages } from 'src/app/shared/components/backendErrorMessages.component';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorsMessages],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  // isSubmitting$ = this.store.select(selectIsSubmitting);
  // backendErrors$ = this.store.select(selectValidationErrors);
  data$ = combineLatest({
    isSubmitting : this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })

  constructor(private fb: FormBuilder, 
              private store: Store<{auth:AuthStateInterface}>,
              private authService:AuthService) {}

  onSubmit() {
    console.log('form', this.form.getRawValue());
    this.store.dispatch(authActions.register({request:{user:this.form.getRawValue()}}))
    this.authService.register({user:this.form.getRawValue()} as RegisterRequestInterface)
                    .subscribe((res)=>console.log('res',res))

  }
}
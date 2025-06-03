import {Component, inject, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import {NgClass, NgStyle} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FloatingInputComponent} from '../../shared/floating-input/floating-input.component';
import {AuthService} from '../../core/auth/auth.service';
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormErrorMessageComponent} from '../../shared/form-error-message/form-error-message.component';
import {LoadingOverlayComponent} from '../../shared/loading-overlay/loading-overlay.component';
import {ModalComponent} from '../../shared/modal/modal.component';

@Component({
  selector: 'app-login',
  imports: [
    NgClass,
    NgStyle,
    RouterLink,
    FloatingInputComponent,
    FormsModule,
    ReactiveFormsModule,
    FormErrorMessageComponent,
    LoadingOverlayComponent,
    ModalComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private readonly fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  isLargeScreen: boolean = false;
  loginForm!: FormGroup;
  isLoading: boolean = false;
  status: string = '';
  message: string = '';
  isVisibleModal: boolean = false;


  constructor() {
    this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .subscribe(result => {
      this.isLargeScreen = result.matches;
    });

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  login() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const {email, senha} = this.loginForm.value;

    this.isLoading = true;

    this.authService.login(email, senha)
    .then((user) => {
      console.log(user);
      this.isLoading = false;
      this.router.navigate(['/home']);
    })
    .catch((error) => {
      this.isLoading = false;
      this.isVisibleModal = true;
      this.status = 'Erro!'

      this.message = error.message;

    });
  }


}

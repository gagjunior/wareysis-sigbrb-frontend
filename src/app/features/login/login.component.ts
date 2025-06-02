import {Component, inject, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import {NgClass, NgStyle} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FloatingInputComponent} from '../../shared/floating-input/floating-input.component';
import {AuthService} from '../../core/auth/auth.service';
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormErrorMessageComponent} from '../../shared/form-error-message/form-error-message.component';
import {LoadingOverlayComponent} from '../../shared/loading-overlay/loading-overlay.component';

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
    LoadingOverlayComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  isLargeScreen: boolean = false;
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  loginForm!: FormGroup;
  isLoading: boolean = false;


  constructor(private readonly fb: NonNullableFormBuilder) {
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
      console.log(error);
    });
  }


}

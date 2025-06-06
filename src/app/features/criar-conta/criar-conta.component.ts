import {Component, inject, OnInit} from '@angular/core';
import {FloatingInputComponent} from "../../shared/floating-input/floating-input.component";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {NgClass, NgStyle} from '@angular/common';
import {CriarContaService} from './criar-conta.service';
import {Router, RouterLink} from '@angular/router';
import {AbstractControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {FormErrorMessageComponent} from '../../shared/form-error-message/form-error-message.component';
import {LucideAngularModule} from 'lucide-angular';
import {LoadingOverlayComponent} from '../../shared/loading-overlay/loading-overlay.component';
import {ModalComponent} from '../../shared/modal/modal.component';

@Component({
  selector: 'app-criar-conta',
  standalone: true,
  imports: [
    FloatingInputComponent,
    NgClass,
    NgStyle,
    RouterLink,
    ReactiveFormsModule,
    FormErrorMessageComponent,
    LucideAngularModule,
    LoadingOverlayComponent,
    ModalComponent
  ],
  templateUrl: './criar-conta.component.html',
  styleUrl: './criar-conta.component.css'
})
export class CriarContaComponent implements OnInit {

  private readonly registroService: CriarContaService = inject(CriarContaService);
  private readonly router: Router = inject(Router);

  isLargeScreen: boolean = false;
  regrasSenhaVisivel: boolean = false;
  registerForm!: FormGroup;
  isLoading: boolean = false;
  isVisibleModal: boolean = false;

  operacao: string = 'Criar conta';
  status: string = '';
  message: string = '';


  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly fb: NonNullableFormBuilder
  ) {
    this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .subscribe(result => {
      this.isLargeScreen = result.matches;
    });
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmeSenha: ['', [Validators.required]]
    }, {validators: this.checkPasswords});
  }

  closeModal(): void {
    this.isVisibleModal = false;
  }

  checkPasswords(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;
    const senha = group.get('senha')?.value;
    const confirmeSenha = group.get('confirmeSenha')?.value;

    return senha === confirmeSenha ? null : {passwordsMismatch: true};
  }

  exibirRegrasSenha(): void {
    this.regrasSenhaVisivel = !this.regrasSenhaVisivel;
  }

  goToLogin() {
    this.isVisibleModal = false;
    this.router.navigate(['/login']);
  }

  registrarUsuario() {

    if (this.registerForm.invalid) {
      this.isVisibleModal = true;
      this.status = 'Verificar';
      this.message = 'Verifique os erros no formulário e tente novamente';
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const {nomeCompleto, email, senha} = this.registerForm.value;

    this.registroService.registerUser({
      nomeCompleto,
      email,
      senha,
      perfis: [{id: 'CLI'}]
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isVisibleModal = true;
        this.status = 'Sucesso'
        this.message = 'Conta criada com sucesso!';
      },
      error: (error) => {
        this.isLoading = false;
        this.isVisibleModal = true;
        this.status = 'Erro'
        if (error.error.message === undefined || error.error.message === null || error.error.message.trim() === '') {
          this.message = 'Ocorreu um erro desconhecido ao criar sua conta!\nPor favor, entre em contato com a barbearia';
        } else {
          this.message = `Ocorreu um erro ao criar sua conta: \n${error.error.message}`;
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}

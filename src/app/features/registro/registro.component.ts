import {Component, inject, OnInit} from '@angular/core';
import {FloatingInputComponent} from "../../shared/floating-input/floating-input.component";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {NgClass, NgStyle} from '@angular/common';
import {RegistroService} from './registro.service';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormErrorMessageComponent} from '../../shared/form-error-message/form-error-message.component';
import {LucideAngularModule} from 'lucide-angular';
import {LoadingOverlayComponent} from '../../shared/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-registro',
  imports: [
    FloatingInputComponent,
    NgClass,
    NgStyle,
    RouterLink,
    ReactiveFormsModule,
    FormErrorMessageComponent,
    LucideAngularModule,
    LoadingOverlayComponent
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {

  private readonly registroService: RegistroService = inject(RegistroService);

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
    private readonly fb: FormBuilder
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

  checkPasswords(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmeSenha = group.get('confirmeSenha')?.value;
    return senha === confirmeSenha ? null : {notSame: true};
  }

  exibirRegrasSenha(): void {
    this.regrasSenhaVisivel = !this.regrasSenhaVisivel;
  }

  registrarUsuario() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const {nomeCompleto, email, senha} = this.registerForm.value;

    console.log(nomeCompleto, email, senha);

    this.registroService.registerUser({
      nomeCompleto,
      email,
      senha,
      perfis: [{id: 'CLI'}]
    }).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.isVisibleModal = true;
        this.status = 'Sucesso'
        this.message = 'Conta criada com sucesso!';
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.isVisibleModal = true;
        this.status = 'Erro'
        this.message = `Ocorreu um erro ao criar sua conta: ${error.error.message}`;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}

import {PerfisDto} from './perfil.dto';

export interface UsuarioResponseDto {

  id: string;
  email: string;
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  emailVerificado: boolean;
  habilitado: boolean;
  alterarSenha: boolean;
  perfis: PerfisDto[];
  dhCriacao: string;
  dhAlteracao: string;

}

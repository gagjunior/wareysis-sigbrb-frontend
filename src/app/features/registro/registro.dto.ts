import {PerfisDto} from '../../core/dto/perfil.dto';

export interface RegistroCreateDto {
  nomeCompleto: string;
  email: string;
  senha: string;
  perfis: PerfisDto[];
}


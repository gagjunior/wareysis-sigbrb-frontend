import {PerfisDto} from '../../core/dto/perfil.dto';

export interface CriarContaDto {
  nomeCompleto: string;
  email: string;
  senha: string;
  perfis: PerfisDto[];
}


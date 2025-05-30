export interface RegistroCreateDto {
  nomeCompleto: string;
  email: string;
  senha: string;
  perfis: PerfisDto[];
}

export interface PerfisDto {
  id: string;
  nome?: string;
}

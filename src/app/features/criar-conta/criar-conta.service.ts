import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {UsuarioResponseDto} from '../../core/dto/usuario.dto';
import {CriarContaDto} from './criar-conta.dto';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CriarContaService {

  private readonly apiUrl: string = `${environment.apiUrl}/usuarios`;

  constructor(private readonly http: HttpClient) {
  }

  registerUser(dto: CriarContaDto): Observable<UsuarioResponseDto> {
    return this.http.post<UsuarioResponseDto>(`${this.apiUrl}/registro`, dto);
  }

}

import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {UsuarioResponseDto} from '../../core/models/usuario.dto';
import {RegistroCreateDto} from './registro.dto';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private readonly apiUrl: string = `${environment.apiUrl}/usuarios`;

  constructor(private readonly http: HttpClient) {
  }

  registerUser(dto: RegistroCreateDto): Observable<UsuarioResponseDto> {
    return this.http.post<UsuarioResponseDto>(`${this.apiUrl}/registro`, dto);
  }

}

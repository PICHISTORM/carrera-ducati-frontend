import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorService } from './tools/error.service';
export interface RegistroUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmar_password: string;
  telefono: string;
  id_usuario: string;
  curp: string;
  rfc: string;
  grado_estudios: string;
  direccion: string;
  estado: string;
  ciudad: string;
  edad: number | null;
  terminos_condiciones: boolean;
}

export interface PerfilUsuarioUI {
  first_name: string;
  last_name: string;
  email: string;
  telefono: string;
  estado: string;
  ciudad: string;
  edad: number | null;

  // extras para UI
  codigo?: string;
  fecha_registro?: string; // ISO
  photoUrl?: string;
  rolEtiqueta?: string; // ej. "DOCENTE BUAP"
}

export type RegistroErrors = Partial<Record<keyof RegistroUser, string>>;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  private readonly storageKey = 'carrera-ducati-registro';


  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorService,
  ) { }

  /* =========================================================
     1) ESQUEMA (modelo base)
     ========================================================= */
  public esquemaUser(): RegistroUser {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmar_password: '',
      telefono: '',
      id_usuario: '',
      curp: '',
      rfc: '',
      grado_estudios: '',
      direccion: '',
      estado: '',
      ciudad: '',
      edad: null,
      terminos_condiciones: false
    };
  }

  public validarUsuario(user: RegistroUser): RegistroErrors {
const error: RegistroErrors = {};

if (!this.validatorService.required(user.first_name)) {
error.first_name = this.errorService.required;
} else if (!this.validatorService.wordsES(user.first_name)) {
error.first_name = this.errorService.pattern;
}

if (!this.validatorService.required(user.last_name)) {
error.last_name = this.errorService.required;
} else if (!this.validatorService.wordsES(user.last_name)) {
error.last_name = this.errorService.pattern;
}

if (!this.validatorService.required(user.email)) {
error.email = this.errorService.required;
} else if (!this.validatorService.email(user.email)) {
error.email = this.errorService.email;
}
// Validación de contraseña - Versión mínima
if (!this.validatorService.required(user.password)) {
    error.password = this.errorService.required;
} else if (!this.validatorService.minLen(user.password, 8)) {
    error.password = 'La contraseña debe tener mínimo 8 caracteres';
}

// Validación de confirmación de contraseña
if (!this.validatorService.required(user.confirmar_password)) {
    error.confirmar_password = this.errorService.required;
} else if (user.password !== user.confirmar_password) {
    error.confirmar_password = 'Las contraseñas no coinciden';
}

if (!this.validatorService.required(user.telefono)) {
error.telefono = this.errorService.required;
} else if (!this.validatorService.phoneMX(user.telefono)) {
error.telefono = this.errorService.pattern;
}

if (!this.validatorService.required(user.id_usuario)) {
    error.id_usuario = this.errorService.required;
} else if (!this.validatorService.regex(user.id_usuario, /^[a-zA-Z0-9]{8}$/)) {
    error.id_usuario = 'El ID debe ser alfanumérico de exactamente 8 caracteres';
}

// Validación de CURP con el servicio
if (!this.validatorService.required(user.curp)) {
    error.curp = this.errorService.required;
} else if (!this.validatorService.curp(user.curp)) {
    error.curp = 'El CURP no es válido';
}

// Validación de RFC
if (!this.validatorService.required(user.rfc)) {
    error.rfc = this.errorService.required;
} else if (!this.validatorService.rfc(user.rfc)) {
    error.rfc = 'El RFC no es válido (formato incorrecto)';
}

// Validación de Grado de Estudios
if (!this.validatorService.required(user.grado_estudios)) {
    error.grado_estudios = this.errorService.required;
}

// Validación de Dirección
if (!this.validatorService.required(user.direccion)) {
    error.direccion = this.errorService.required;
} else if (!this.validatorService.minLen(user.direccion, 5)) {
    error.direccion = 'La dirección debe tener mínimo 5 caracteres';
} else if (!this.validatorService.maxLen(user.direccion, 100)) {
    error.direccion = 'La dirección debe tener máximo 100 caracteres';
}

// Validación de Estado
if (!this.validatorService.required(user.estado)) {
    error.estado = this.errorService.required;
}



if (!this.validatorService.required(user.ciudad)) {
error.ciudad = this.errorService.required;
} else if (!this.validatorService.wordsES(user.ciudad)) {
error.ciudad = this.errorService.pattern;
}

if (user.edad === null || user.edad === undefined) {
  error.edad = this.errorService.required;
} else if (!this.validatorService.betweenNumber(user.edad, 18, 80)) {
  error.edad = this.errorService.msg('between', 18, 80);
}

if (user.terminos_condiciones !== true) {
error.terminos_condiciones = this.errorService.required;
}

return error;
}

  public guardarUsuario(user: RegistroUser): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  public obtenerUsuario(): RegistroUser | null {
    const rawUser = localStorage.getItem(this.storageKey);

    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as RegistroUser;
    } catch {
      return null;
    }
  }

  public limpiarUsuario(): void {
    localStorage.removeItem(this.storageKey);
  }

}

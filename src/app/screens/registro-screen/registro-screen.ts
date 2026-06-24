import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { RegistroErrors, RegistroUser, UsuariosService } from '../../services/usuarios-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-screen',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './registro-screen.html',
  styleUrl: './registro-screen.scss',
})
export class RegistroScreen implements OnInit {

  /* =========================
     Estado
     ========================= */
  public user!: RegistroUser;
  public errors: RegistroErrors = {};
  public isLoading = false;

  /* Password */
  public hide_1 = true;
  public inputType_1: 'password' | 'text' = 'password';


  /* Confirmar Password */
  public hide_2 = true;
  public inputType_2: 'password' | 'text' = 'password';

  /* Edades */
  public edades: Array<{ value: number }> = [];

  /*estados*/
  estados: string[] = [
    'Aguascalientes',
    'Baja California',
    'Baja California Sur',
    'Campeche',
    'Chiapas',
    'Chihuahua',
    'Coahuila de Zaragoza',
    'Colima',
    'Durango',
    'Estado de México',
    'Guanajuato',
    'Guerrero',
    'Hidalgo',
    'Jalisco',
    'Michoacán de Ocampo',
    'Morelos',
    'Nayarit',
    'Nuevo León',
    'Oaxaca',
    'Puebla',
    'Querétaro',
    'Quintana Roo',
    'San Luis Potosí',
    'Sinaloa',
    'Sonora',
    'Tabasco',
    'Tamaulipas',
    'Tlaxcala',
    'Veracruz de Ignacio de la Llave',
    'Yucatán',
    'Zacatecas'
  ];

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.usuariosService.esquemaUser();

    // Llenar el array de edades
    this.llenarArrayEdades();
  }

  private llenarArrayEdades(): void {

    this.edades = Array.from({ length: 63 }, (_, i) => ({ value: i + 18 }));
  }

  public terminosCondiciones(): void {
    // Aquí puede abrir modal / navegar / etc.
    alert('Aquí se mostrarán los Términos y Condiciones.');
  }

  public registrar(): void {
    if (this.isLoading) return;

    console.log('Registro de usuario:', this.user);

    // // 1) Validación centralizada en UsuariosService
    this.errors = this.usuariosService.validarUsuario(this.user);

    // // 2) Sin jQuery: si hay errores, se detiene
     if (Object.keys(this.errors).length > 0) return;

    // 3) Registro
    this.isLoading = true;


  }

  public goLogin(): void {
    this.router.navigate(['']);
  }

  public showPassword(): void {
    this.hide_1 = !this.hide_1;
    this.inputType_1 = this.hide_1 ? 'password' : 'text';
  }

  public showPwdConfirmar():void{

    this.hide_2 = !this.hide_2;
    this.inputType_2 = this.hide_2 ? 'password' : 'text';
  }



    public soloLetras(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { RegistroUser, UsuariosService } from '../../services/usuarios-service';
import { FooterApp } from '../../partials/footer-app/footer-app';
import { HeaderApp } from '../../partials/header-app/header-app';
import { LeftSidebar } from '../../partials/left-sidebar/left-sidebar';

@Component({
  selector: 'app-perfil-usuario-screen',
  imports: [
    ...SHARED_IMPORTS,
    HeaderApp,
    LeftSidebar,
    FooterApp,
  ],
  templateUrl: './perfil-usuario-screen.html',
  styleUrl: './perfil-usuario-screen.scss',
})
export class PerfilUsuarioScreen implements OnInit {

  public usuario: RegistroUser | null = null;
  public readonly photoUrl = '/assets/images/ProfilePicture.png';
  public isLogin = true;
  public drawerOpen = false;
  public showLicensed = false;

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.usuario = this.usuariosService.obtenerUsuario();

    if (!this.usuario) {
      this.router.navigate(['registro']);
    }
  }

  public get nombreCompleto(): string {
    if (!this.usuario) {
      return '';
    }

    return `${this.usuario.first_name} ${this.usuario.last_name}`.trim();
  }

  public get ubicacion(): string {
    if (!this.usuario) {
      return '';
    }

    return `${this.usuario.ciudad}, ${this.usuario.estado}`.trim();
  }

  public goRegistro(): void {
    this.router.navigate(['registro']);
  }

  public toggleSidebar(): void {
    this.drawerOpen = !this.drawerOpen;
  }

  public closeSidebar(): void {
    this.drawerOpen = false;
  }

}

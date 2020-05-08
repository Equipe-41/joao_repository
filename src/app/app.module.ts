import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MasterComponent } from './master/master.component';
import { HomeComponent } from './home/home.component';
import { rounting } from './app.rounting';
import { CursoBaseService } from './base/curso-base.service';
import { CursoListaComponent } from './curso-lista/curso-lista.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioCriarComponent } from './usuario-criar/usuario-criar.component';
import { UsuarioEsqueciComponent } from './usuario-esqueci/usuario-esqueci.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoComprarComponent } from './curso-comprar/curso-comprar.component';
import { UsuarioBaseService } from './base/usuario-base.service';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    HomeComponent,
    CursoListaComponent,
    UsuarioLoginComponent,
    UsuarioCriarComponent,
    UsuarioEsqueciComponent,
    CursoDetalheComponent,
    CursoComprarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    rounting
  ],
  providers: [ CursoBaseService, UsuarioBaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

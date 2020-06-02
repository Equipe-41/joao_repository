import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CursoListaComponent } from "./curso-lista/curso-lista.component";
import { VideoListaComponent } from "./video-lista/video-lista.component";
import { UsuarioLoginComponent } from "./usuario-login/usuario-login.component";
import { UsuarioCriarComponent } from "./usuario-criar/usuario-criar.component";
import { UsuarioEsqueciComponent } from "./usuario-esqueci/usuario-esqueci.component";
import { CursoDetalheComponent } from "./curso-detalhe/curso-detalhe.component";
import { CursoComprarComponent } from "./curso-comprar/curso-comprar.component";
import { CursoCadastroComponent } from './curso-cadastro/curso-cadastro.component';
import { VideoCadastroComponent } from './video-cadastro/video-cadastro.component';
import { VideoPlayComponent } from './video-play/video-play.component';

const routes: Routes = [
    { path: '', component: CursoListaComponent},
    { path: 'usuarioLogin', component: UsuarioLoginComponent},
    { path: 'usuarioCriar', component: UsuarioCriarComponent},
    { path: 'usuarioEsqueci', component: UsuarioEsqueciComponent},
    { path: 'cursoLista/:matriculado', component: CursoListaComponent},
    { path: 'cursoMatriculado/:matriculado', component: CursoListaComponent},
    { path: 'cursoCadastro/:operacao/:id', component: CursoCadastroComponent},
    { path: 'cursoDetalhe/:id', component: CursoDetalheComponent},
    { path: 'cursoComprar/:id', component: CursoComprarComponent},
    { path: 'videoLista/:id', component: VideoListaComponent},
    { path: 'videoCadastro/:id_curso/:operacao/:id', component: VideoCadastroComponent},
    { path: 'videoPlay/:id', component: VideoPlayComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

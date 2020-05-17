import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CursoListaComponent } from "./curso-lista/curso-lista.component";
import { UsuarioLoginComponent } from "./usuario-login/usuario-login.component";
import { UsuarioCriarComponent } from "./usuario-criar/usuario-criar.component";
import { UsuarioEsqueciComponent } from "./usuario-esqueci/usuario-esqueci.component";
import { CursoDetalheComponent } from "./curso-detalhe/curso-detalhe.component";
import { CursoComprarComponent } from "./curso-comprar/curso-comprar.component";
import { CursoCadastroComponent } from './curso-cadastro/curso-cadastro.component';

const routes: Routes = [
    { path: '', component: CursoListaComponent},
    { path: 'usuarioLogin', component: UsuarioLoginComponent},
    { path: 'usuarioCriar', component: UsuarioCriarComponent},
    { path: 'usuarioEsqueci', component: UsuarioEsqueciComponent},
    { path: 'cursoLista', component: CursoListaComponent},
    { path: 'cursoCadastro/:operacao/:id', component: CursoCadastroComponent},
    { path: 'cursoDetalhe/:id', component: CursoDetalheComponent},
    { path: 'cursoComprar/:id', component: CursoComprarComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }


import { Routes, Router, RouterModule} from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { CursoListaComponent } from "./curso-lista/curso-lista.component";
import { UsuarioLoginComponent } from "./usuario-login/usuario-login.component";
import { UsuarioCriarComponent } from "./usuario-criar/usuario-criar.component";
import { UsuarioEsqueciComponent } from "./usuario-esqueci/usuario-esqueci.component";
import { CursoDetalheComponent } from "./curso-detalhe/curso-detalhe.component";
import { CursoComprarComponent } from "./curso-comprar/curso-comprar.component";

const APP_ROUTES: Routes = [
    { path: '', component: CursoListaComponent},
    { path: 'usuarioLogin', component: UsuarioLoginComponent},
    { path: 'usuarioCriar', component: UsuarioCriarComponent},
    { path: 'usuarioEsqueci', component: UsuarioEsqueciComponent},
    { path: 'cursoLista', component: CursoListaComponent},
    { path: 'cursoDetalhe/:id', component: CursoDetalheComponent},
    { path: 'cursoComprar/:id', component: CursoComprarComponent},
];

export const rounting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);


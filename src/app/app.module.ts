import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrModule } from 'ngx-toastr';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HomeComponent } from './home/home.component';
import { MasterComponent } from './master/master.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatDialogModule } from '@angular/material/dialog';
import { TextMaskModule } from 'angular2-text-mask';
import { HttpModule } from '@angular/http';
import { CursoBaseService } from './base/curso-base.service';
import { CursoListaComponent } from './curso-lista/curso-lista.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioCriarComponent } from './usuario-criar/usuario-criar.component';
import { UsuarioEsqueciComponent } from './usuario-esqueci/usuario-esqueci.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoComprarComponent } from './curso-comprar/curso-comprar.component';
import { UsuarioBaseService } from './base/usuario-base.service';
import { ModalService } from './service/modal.service';
import { CommonModule } from '@angular/common';
import { TokenService } from './service/token.service';
import { CursoCadastroComponent } from './curso-cadastro/curso-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    MasterComponent,
    HomeComponent,
    CursoListaComponent,
    UsuarioLoginComponent,
    UsuarioCriarComponent,
    UsuarioEsqueciComponent,
    CursoDetalheComponent,
    CursoComprarComponent,
    CursoCadastroComponent
],
  imports: [
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    MatExpansionModule,
    DragDropModule,
    MatMenuModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, // for database
    AngularFireAuthModule,
    MatDialogModule,
    TextMaskModule,
    AngularFirestoreModule,
    ModalModule.forRoot(),
    HttpModule
  ],
  providers: [ ModalService, TokenService, CursoBaseService, UsuarioBaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

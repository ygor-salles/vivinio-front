//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//Componentes Criados
import { HeaderComponent } from './components/template/header/header.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './views/home/home.component';
import { WinesCrudComponent } from './views/wines-crud/wines-crud.component';
import { WineCreateComponent } from './components/wine/wine-create/wine-create.component';
import { LOCALE_ID } from '@angular/core';
import { WineReadComponent } from './components/wine/wine-read/wine-read.component';
import { WineDeleteComponent } from './components/wine/wine-delete/wine-delete.component';
import { DialogComponent } from './services/dialog/dialog.component';
import { WineUpdateComponent } from './components/wine/wine-update/wine-update.component';
import { ReviewReadComponent } from './components/wine/wine-review/wine-review.component';
import { UsersCrudComponent } from './views/users-crud/users-crud.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserReadComponent } from './components/user/user-read/user-read.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { LoginComponent } from './login/login/login.component'; 
import { TopRatedComponent } from './views/top-rated/top-rated.component';
import { AutenticacaoInterceptor } from './interceptors/autenticacao.interceptor';

//Services globais
import { AuthService } from './services/auth.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    HomeComponent,
    WinesCrudComponent,
    WineCreateComponent,
    WineReadComponent,
    WineDeleteComponent,
    DialogComponent,
    WineUpdateComponent,
    ReviewReadComponent,
    UsersCrudComponent,
    UserCreateComponent,
    UserReadComponent,
    UserDeleteComponent,
    UserUpdateComponent,
    LoginComponent,
    TopRatedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    { provide: HTTP_INTERCEPTORS, useClass: AutenticacaoInterceptor, multi: true, },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

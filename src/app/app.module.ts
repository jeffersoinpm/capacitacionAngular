import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Componente1Component} from './componente1/componente1.component';
import {Router, RouterModule, Routes} from '@angular/router';
import { MaterialModuleModule } from './material-module/material-module.module';
import { AppComponent } from './app.component';
import { Componente2Component } from './componente2/componente2.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ApiService } from './servicio';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { PosicionConsolidadaComponent } from './posicion-consolidada/posicion-consolidada.component';
import { SaldoAhorrosComponent } from './saldo-ahorros/saldo-ahorros.component';
import { internetComponent } from './internet';
import { EjemploTablaComponent } from './ejemplo-tabla/ejemplo-tabla.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment.prod';
import { EjemploPruebaComponent } from './ejemplo-prueba/ejemplo-prueba.component';
import { PruebaComponent } from './prueba/prueba.component';
const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'posConsolidada', component: PosicionConsolidadaComponent},
  {path: 'home', component: HomeComponentComponent},
  {path: 'primerComponente', component: Componente1Component},
  {path: 'segundoComponente', component: Componente2Component},
  {path: 'saldoAhorros', component: SaldoAhorrosComponent},
  {path: 'ejemplotabla', component: EjemploTablaComponent},
  {path: 'ejemploPrueba', component: EjemploPruebaComponent},
  {path: 'prueba', component: PruebaComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    Componente1Component,
    Componente2Component,
    HomeComponentComponent,
    LoginComponent,
    PosicionConsolidadaComponent,
    SaldoAhorrosComponent,
    EjemploTablaComponent,
    EjemploPruebaComponent,
    PruebaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MaterialModuleModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ApiService,
    internetComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

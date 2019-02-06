import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicio';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-componente2',
  templateUrl: './componente2.component.html',
  styleUrls: ['./componente2.component.css']
})
export class Componente2Component implements OnInit {
  nombreForm = new FormControl();
  dated = new FormControl();
  fpago: Date;
  mensaje = '';
  dias = '';
  datos: any;
  displayedColumnsAhorros = ['Cuenta', 'Moneda',''];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  consumoRest() {
    this.fpago = new Date(this.dated.value);
    const fdesde = this.fpago.getFullYear() + '-' + (this.fpago.getMonth() + 1) + '-' + this.fpago.getDate();
    const parametros = {nombre: this.nombreForm.value, fechaCum: fdesde};
    this.apiService.postProvider('/servicioEjemplo', 'hgfgfjg', parametros).then((data: any) => {
      console.log(data);
      this.mensaje = data.saludo;
      this.dias = data.diasCumple;
      this.datos = data.array;
    });
  }
  consumo2Rest() {
    const parametros = {id: this.nombreForm.value};
    this.apiService.postProvider('/servicioCuenta', 'hgfgfjg', parametros).then((data: any) => {
      console.log(data);
    });
  }
}

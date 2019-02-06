import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../servicio';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
  idForm = new FormControl();
  nombre: string;
  deshabilitar: boolean;
  cuentas: any;
  saldosTabla: any;
  saldos: any;
  tablaPagos: any;
  tablaDePagos: boolean;
  saldosP: boolean;
  cuentaSelected = new FormControl();
  displayedColumnsIds = ['Producto', 'Moneda', 'Capital', 'Plazo', 'Tasa', 'Vencimiento', 'SaldoA', 'SaldoV', 'ProximoPago', 'Estado'];
  displayedColumnsIds2 = ['Fecha', 'Cuota', 'Interes', 'InteresPago', 'Capital', 'CapitalPago', 'Seguro', 'SeguroPago'];
  constructor(private apiService: ApiService) {
    this.tablaDePagos = false;
    this.saldosP = false;
  }

  ngOnInit() {
  }
  consulta() {
    this.deshabilitar = true;
    const parametros = { 'id': this.idForm.value, 'usuario': localStorage.getItem('user') };
      this.apiService.postProvider2('/prestamosCliente', localStorage.getItem('token'), parametros).then((data: any) => {
        this.nombre = data.clientName;
        if (data.array) {
          this.cuentas = data.array;
        }
      }, (err) => {
        console.log(err);
      });
  }
  mostrarTabla() {
    const pedido = { 'id': this.idForm.value, 'ccuenta': this.cuentaSelected.value, 'usuario': localStorage.getItem('user') };
    this.apiService.postProvider2('/loanBalanceQuery', localStorage.getItem('token'), pedido).then((data: any) => {
      if (data) {
        this.saldos = [data];
        this.saldosP = true;
      }
    }, (err) => {
      console.log(err);
    });
  }
  consultaTablaPagos() {
    const pedido = { 'subsistema': '06', 'ccuenta': this.cuentaSelected.value };
    this.apiService.postProvider2('/loadTransactionsQuery', localStorage.getItem('token'), pedido).then((data: any) => {
      if (data) {
        this.tablaPagos = data.movimientos;
        this.tablaDePagos = true;
      }
    }, (err) => {
      console.log(err);
    });
  }
}

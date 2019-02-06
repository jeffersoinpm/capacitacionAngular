import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../servicio';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saldo-ahorros',
  templateUrl: './saldo-ahorros.component.html',
  styleUrls: ['./saldo-ahorros.component.css']
})
export class SaldoAhorrosComponent implements OnInit, AfterViewInit {
  @Input()
  params: any;

  idForm = new FormControl();
  cuentaForm2 = new FormControl();
  nombre: string;
  deshabilitar: boolean;
  cuentas: any;
  datos: any;
  peticion: boolean;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.deshabilitar = false;
    if ( this.params) {
      this.params = {
        cuenta: '',
        Id: ''
      };
      this.params.cuenta = this.route.snapshot.paramMap.get('cuenta');
      this.params.Id = this.route.snapshot.paramMap.get('Id');
    }
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.consultaSaldos();
  }
  consulta() {
    const envio = { 'usuario': localStorage.getItem('user'), 'id': this.idForm.value.toString() };
    this.apiService.postProvider2('/cuentasCliente', localStorage.getItem('token'), envio).then((data: any) => {
      if (data) {
        this.nombre = data.clientName;
        this.cuentas = data.array;
        this.deshabilitar = true;
      }
      console.log(data);
    }, (err) => {
      console.log(err);
    });
  }
  consultaSaldos() {
    let pedido = { 'id': this.params.Id, 'ccuenta': this.params.cuenta, 'usuario': localStorage.getItem('user') }
    this.apiService.postProvider2('/accountBalanceQuery', localStorage.getItem('token'), pedido).then(
      (data: any) => {
        if (data) {
          console.log(data);
          this.datos =[data];
          this.peticion = true;
        }
      }, (err) => {
        console.log();
      })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../servicio';
import { Router } from '@angular/router';
import { internetComponent } from '../internet';

@Component({
  selector: 'app-posicion-consolidada',
  templateUrl: './posicion-consolidada.component.html',
  styleUrls: ['./posicion-consolidada.component.css']
})
export class PosicionConsolidadaComponent implements OnInit {
  idForm = new FormControl();
  nombre: string;
  deshabilitar: boolean;
  datos2: any;
  params: any;
  datos2Offline: any;
  consultas: any;
  displayedColumnsAhorros = ['Cuenta', 'Producto', 'Moneda', 'Disponible', 'PorConfirmar', 'Bloqueado', 'Total', 'Estado'];
  displayedColumnsPlazoFijo = ['Cuenta', 'Producto', 'Moneda', 'Capital', 'Plazo', 'Tasa', 'Vencimiento', 'Cuota', 'Estado'];
  displayedColumnsPrestamos = ['Cuenta', 'Producto', 'Moneda', 'Capital', 'Plazo',
  'Tasa', 'Vencimiento', 'SaldoA', 'SaldoV', 'ProximoPago', 'Estado'];
  displayedColumnsPendientes = ['Id'];
  constructor(private apiService: ApiService, private router: Router, private internet: internetComponent) {
    this.deshabilitar = false;
    this.datos2 = [];
    this.params = '';
    this.consultas = JSON.parse(localStorage.getItem('posConsolidadaPendientes'));
   }

  ngOnInit() {
  }

  consulta() {
    this.deshabilitar = true;
    const envio = { 'usuario': localStorage.getItem('user'), 'id': this.idForm.value.toString() };
    if (this.internet.internet) {
      this.apiService.postProvider('/queryAllAccounts', localStorage.getItem('token'), envio).then((data: any) => {
        this.nombre = data.clientName;
        if (data.array) {
          console.log('Sin agrupar: ' + data.array);
          this.datos2 = this.groupBy2(data.array, function (item) {
            return [item.grupo, item.subsistema, item.cproducto];
          });
          console.log('Agrupado: ' + this.datos2);
        }
        data['id'] = this.idForm.value;
        localStorage.setItem('posConsolidada', JSON.stringify(data));
      }, (err) => {
        console.log(err);
      });
    } else {
      this.consultaoffline(envio);
    }
  }

  groupBy2(arrayNF, f) {
    const groups = {};
    arrayNF.forEach(function (o) {
      const group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    });
  }

  mostrarSaldoAhorros(id: string, ccuenta: string) {
    this.deshabilitar = false;
    this.params = {
      'cuenta': ccuenta,
      'Id': id
    };
  }
  rutearSaldoAhorros(id: string, ccuenta: string) {
    this.params = {
      'cuenta': ccuenta,
      'Id': id
    };
    this.router.navigate(['/saldoAhorros', this.params]);
  }
  regresar() {
    this.deshabilitar = true;
    this.params = '';
  }
  limpiar() {
    this.idForm.reset();
    this.nombre = '';
    this.datos2 = '';
    this.datos2Offline = '';
    this.deshabilitar = false;
  }
  consultaoffline(envio: any) {
    this.datos2Offline = JSON.parse(localStorage.getItem('posConsolidada'));
    if (this.datos2Offline) {
      if (this.datos2Offline.id === this.idForm.value.toString()) {
        alert('Consulta offline OK!');
        this.nombre = this.datos2Offline.clientName;
        this.datos2 = this.groupBy2(this.datos2Offline.array, function (item) {
          return [item.grupo, item.subsistema, item.cproducto];
        });
      } else {
        this.guardarConsultas(envio);
        alert('No existe consulta previa con id ingresado!, Consulta almacenada');
      }
    } else {
      this.guardarConsultas(envio);
      alert('No existe consulta previa con id ingresado!, Consulta almacenada');
    }
  }
  guardarConsultas(envio: any) {
    this.consultas = JSON.parse(localStorage.getItem('posConsolidadaPendientes'));
    if (this.consultas) {
      this.consultas.push(envio);
    } else {
      this.consultas = [];
      this.consultas.push(envio);
    }
    localStorage.setItem('posConsolidadaPendientes', JSON.stringify(this.consultas));
  }
  consultasPendientes(id: string) {
    if (this.internet.internet) {
      this.idForm.setValue(id);
      this.consulta();
    } else {
      alert('No esta conectado');
    }
  }
}

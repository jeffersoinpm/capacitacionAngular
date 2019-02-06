import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-ejemplo-prueba',
  templateUrl: './ejemplo-prueba.component.html',
  styleUrls: ['./ejemplo-prueba.component.css']
})
export class EjemploPruebaComponent implements OnInit {
  displayedColumnsIds = ['Nombre', 'Hora', 'Minuto', 'Segundo'];
  nombre = new FormControl('', Validators.required);
  nombreSelected = new FormControl('', Validators.required);
  personas: any;
  personasTabla: any;
  constructor() {
    this.personas = [];
  }
  ngOnInit() {
  }
  agregarId() {
    this.personas.push({nombre: this.nombre.value,
       hora: new Date().getHours(), minuto: new Date().getMinutes(), segundo: new Date().getSeconds()});
    alert('Nombre:' + this.nombre.value + ' agregado');
  }
  mostrarTabla() {
    this.personasTabla = new MatTableDataSource(this.personas);
    this.personasTabla.filter = this.nombreSelected.value;
  }
  applyFilter(filterValue: string) {
    this.personasTabla.filter = filterValue;
  }
}
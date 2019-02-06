import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ejemplo-tabla',
  templateUrl: './ejemplo-tabla.component.html',
  styleUrls: ['./ejemplo-tabla.component.css']
})
export class EjemploTablaComponent implements OnInit {
  nombre = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*$')]);
  email = new FormControl('', [Validators.required, Validators.email]);
  cantidad = new FormControl();
  displayedColumns = ['Cedula', 'Nombre', 'Apellido', 'Genero', 'Edad'];
  generos = [{cod: 'M' , value: 'Masculino'}, {cod: 'F', value: 'Femenino'} ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  ngOnInit() {
  }

  constructor() {
  }
  mostrar () {
    console.log(this.dataSource.filteredData);
  }
  imprimir2 () {
    console.log(this.nombre.value + this.email.value + this.cantidad.value);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }
}

export interface Element {
  cedula: string;
  nombre: string;
  apellido: string;
  genero: any;
  edad: number;
}

const ELEMENT_DATA: Element[] = [
  {cedula:'1715486161', nombre: 'Daniel', apellido:'Del Castillo', genero:"M", edad:25},
  {cedula:'1722186161', nombre: 'Andres', apellido:'Martinez', genero:"M", edad:24},
  {cedula:'1815486168', nombre: 'Sofia', apellido:'Perez', genero:"F", edad:27},
  {cedula:'1715496861', nombre: 'Jessica', apellido:'Fernandez', genero:"F", edad:28}
]
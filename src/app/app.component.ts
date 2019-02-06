import { Component, OnInit } from '@angular/core';
import { internetComponent } from './internet';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'capacitacion';
  constructor(public internet: internetComponent, private swUpdate: SwUpdate) {

  }
  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('Nueva version disponible, cargar nueva version?')) {
          window.location.reload();
        }
      });
    }
  }
}

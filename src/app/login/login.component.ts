import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../servicio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string;
  contrasena: string;
  usernameFormControl = new FormControl('', Validators.required);
  passwordFormControl = new FormControl('', Validators.required);
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.usuario = this.usernameFormControl.value;
    this.contrasena = this.passwordFormControl.value;
    const user = { 'usuario': this.usuario, 'contrasena':
     '53616c7465645f5fc943c047b6b594929c0018062d965220a59cacbcb25b9ee0', 'desencriptar': '1' };
    this.apiService.loginProvider('/oauth', user).then((data: any) => {
      if (data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', this.usuario);
        this.router.navigate(['/prueba']);
      }
    }, (err) => {
        console.log(err);
      });

  }
}

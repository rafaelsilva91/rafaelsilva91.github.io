import { Cliente } from './../entities/cliente';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient,
    private snack: MatSnackBar) { }

  findAll(): Observable<Cliente[]>{
    const url = this.baseUrl + "/clientes";
    return this.http.get<Cliente[]>(url);
  }

  findById(id: any):Observable<Cliente>{
    const url = this.baseUrl + "/clientes/"+id;
    /*const url = `${this.baseUrl}/tecnicos/${id}`*/
    return this.http.get<Cliente>(url);
  }

  create(cliente: Cliente):Observable<Cliente>{
    const url = this.baseUrl + "/clientes";
    return this.http.post<Cliente>(url, cliente);
  }

  update(cliente: Cliente):Observable<Cliente>{
    const url = this.baseUrl + "/clientes/" +cliente.id;
    /*const url = `${this.baseUrl}/tecnicos/${id}`*/
    return this.http.put<Cliente>(url, cliente);
  }

  delete(id: any):Observable<void>{
    const url = `${this.baseUrl}/clientes/${id}`
    return this.http.delete<void>(url);
  }

  message(msg: String):void{
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }

}

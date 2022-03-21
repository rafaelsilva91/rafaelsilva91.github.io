import { Observable } from 'rxjs';
import { OS } from './../entities/os';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OsService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient,
    private snack: MatSnackBar) { }

  findAll(): Observable<OS[]>{
    const url = this.baseUrl + "/OS";
    return this.http.get<OS[]>(url);
  }

  findById(id: any):Observable<OS>{
    const url = `${this.baseUrl}/OS/${id}`;
    return this.http.get<OS>(url);
  }

  create(os: OS):Observable<OS>{
    const url = this.baseUrl + "/OS";
    return this.http.post<OS>(url, os);
  }

  update(os: OS):Observable<OS>{
    //const url = `${this.baseUrl}/OS/${os.id}`
    const url = `${this.baseUrl}/OS`
    return this.http.put<OS>(url, os);
  }

  delete(id: any):Observable<void>{
    const url = `${this.baseUrl}/OS/${id}`
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

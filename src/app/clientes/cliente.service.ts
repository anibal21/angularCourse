import { Injectable } from "@angular/core";
import { DatePipe } from '@angular/common';
import { Cliente } from "./cliente";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import swal from 'sweetalert2'
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class ClienteService {
  private urlEndpoint: string = "http://localhost:8080/api/clientes";
  private httpHeaders = new HttpHeaders({ ContentType: "application/json" });

  constructor(private http: HttpClient, private router: Router) {}

  getClientes = (): Observable<Cliente[]> =>
    this.http
      .get(this.urlEndpoint)
      .pipe(
        tap(response => {
          let clientes = response as Cliente[];
          clientes.forEach(cliente => {
            console.log(cliente.nombre)
          });
        }),
        map(response => {
        let clientes = response as Cliente[];

        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy', 'en-US');
          return cliente;
        });
      }),
      tap(response => {
        response.forEach(cliente => {
          console.log(cliente.nombre)
        });
      }));

  create = (cliente: Cliente): Observable<Cliente> =>
    this.http.post<Cliente>(this.urlEndpoint, cliente, {
      headers: this.httpHeaders
    }).pipe(
      catchError(e => {

        if(e.status === 400){
          return throwError(e);
        }

        console.error(e);
        swal("Error al crear al cliente", e.error.mensaje, "error");
        return throwError(e);
      })
    );

  getCliente = (id: number): Observable<Cliente> =>
    this.http.get<Cliente>(`${this.urlEndpoint}/${id}`)
      .pipe(
        catchError(e => {

        if(e.status === 400){
          return throwError(e);
        }

        this.router.navigate(['/clientes']);
        swal("Error al editar", e.error.message, "error");
        return throwError(e);
    }));

  update = (cliente: Cliente): Observable<Cliente> =>
    this.http.put<Cliente>(`${this.urlEndpoint}/${cliente.id}`, cliente, {
      headers: this.httpHeaders
    }).pipe(
      catchError(e => {
        console.error(e);
        swal("Error al editar al cliente", e.error.mensaje, "error");
        return throwError(e);
      })
    );

  delete = (cliente: Cliente): Observable<Cliente> =>
  this.http.delete<Cliente>(`${this.urlEndpoint}/${cliente.id}`, {headers: this.httpHeaders}).pipe(
    catchError(e => {
      console.error(e);
      swal("Error al eliminar al cliente", e.error.mensaje, "error");
      return throwError(e);
    })
  );
}

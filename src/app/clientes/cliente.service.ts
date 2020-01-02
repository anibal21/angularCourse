import { Injectable } from "@angular/core";
import { CLIENTES } from "./clientes.json";
import { Cliente } from "./cliente";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
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
      .pipe(map(response => response as Cliente[]));

  create = (cliente: Cliente): Observable<Cliente> =>
    this.http.post<Cliente>(this.urlEndpoint, cliente, {
      headers: this.httpHeaders
    }).pipe(
      catchError(e => {
        console.error(e);
        swal("Error al crear al cliente", e.error.mensaje, "error");
        return throwError(e);
      })
    );

  getCliente = (id: number): Observable<Cliente> =>
    this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(catchError(e => {
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

import { Component, OnInit } from "@angular/core";
import { Cliente } from "./cliente";
import { ClienteService } from "./cliente.service";
import { tap } from 'rxjs/operators'
import swal from 'sweetalert2'

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html"
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteService
      .getClientes().pipe(
        tap(clientes => {
          console.log("ClientesComponent: tap3");
          clientes.forEach(cliente => {
            console.log(cliente.nombre)
          })
        })
      ).subscribe((clientes: Cliente[]) => (this.clientes = clientes));
  }

  delete = (cliente: Cliente): void => {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  } 
}

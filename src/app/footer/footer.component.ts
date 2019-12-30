import { Component } from "@angular/core";

interface IFooterComponent {
  nombre: string;
  apellido: string;
}

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent {
  public autor: IFooterComponent = {
    nombre: "Aníbal",
    apellido: "Rodríguez"
  };
}

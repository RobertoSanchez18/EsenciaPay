import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  hiddenMonto: boolean = false;
  isFormVisible: boolean = false;
  isAlertSuccess: boolean = false;
  transacciones: any[] = [
    { 
      nombre: "Jose Perez",
      fecha: "20/08/2024",
      monto: "-50.00"
    },
    { 
      nombre: "Desconocido",
      fecha: "01/02/2024",
      monto: "-10.00"
    },
    { 
      nombre: "Miguel Cuadros",
      fecha: "20/05/2024",
      monto: "-80.00"
    },
    { 
      nombre: "Pepe Huaman",
      fecha: "12/08/2023",
      monto: "+100.00"
    },
  ]

  mostrarSaldo() {  
    this.hiddenMonto = !this.hiddenMonto;
  }

  toggleForm(isForm: boolean) {
    this.isFormVisible = isForm;
  }

  closeForm() {
    this.isFormVisible = false;
  }

  viewAlert() {
    this.isAlertSuccess = true;

    setTimeout(() => {
      this.isAlertSuccess = false;
    }, 3000);
  }

}

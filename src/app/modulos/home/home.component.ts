import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EsenciaPayService } from 'src/app/service/esencia-pay.service';
import Web3 from 'web3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  userAddress: string = ''
  balance: string = '0';
  hiddenMonto: boolean = false;
  isAlertSuccess: boolean = false;

  isVisibleFormDeposito: boolean = false;
  isVisibleFormTransferir: boolean = false;
  isVisibleFormRetirar: boolean = false;

  visibleFormDeposite(){
    this.isVisibleFormDeposito = true;
    this.isVisibleFormTransferir = false;
    this.isVisibleFormRetirar = false;
  }

  visibleFormTransferir(){
    this.isVisibleFormTransferir = true;
    this.isVisibleFormDeposito = false;
    this.isVisibleFormRetirar = false;
  }

  visibleFormRetirar(){
    this.isVisibleFormRetirar = true;
    this.isVisibleFormDeposito = false;
    this.isVisibleFormTransferir = false;
  }

  mostrarSaldo() {
    this.hiddenMonto = !this.hiddenMonto;
  }
  transacciones: any[] = [
    {
      nombre: 'Jose Perez',
      fecha: '20/08/2024',
      monto: '-50.00',
    },
    {
      nombre: 'Desconocido',
      fecha: '01/02/2024',
      monto: '-10.00',
    },
    {
      nombre: 'Miguel Cuadros',
      fecha: '20/05/2024',
      monto: '-80.00',
    },
    {
      nombre: 'Pepe Huaman',
      fecha: '12/08/2023',
      monto: '+100.00',
    },
  ];

  constructor(private web3Service: EsenciaPayService) {}

  ngOnInit(): void {
    this.connectWallet();
    this.loadBalance();
  }

  async connectWallet() {
    try {
      this.userAddress = await this.web3Service.connectWallet();
      console.log('Dirección de la cuenta:', this.userAddress);
    } catch (error) {
      console.error('Error al conectar la billetera', error);
    }
    this.loadBalance();
  }

  async loadBalance() {
    this.balance = await this.web3Service.getBalance();
  }

  async deposit(amount: string) {
    await this.web3Service.deposit(amount);
    this.loadBalance();
  }

  async transfer(to: string, amount: string) {
    await this.web3Service.transfer(to, amount);
    this.loadBalance();
  }

  async withdraw(amount: string) {
    await this.web3Service.withdraw(amount);
    this.loadBalance();
  }
}

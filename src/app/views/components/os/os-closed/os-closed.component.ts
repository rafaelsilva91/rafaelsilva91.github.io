import { ClienteService } from './../../../../models/services/cliente.service';
import { TecnicoService } from 'src/app/models/services/tecnico.service';
import { Router } from '@angular/router';
import { OsService } from './../../../../models/services/os.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OS } from './../../../../models/entities/os';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-os-closed',
  templateUrl: './os-closed.component.html',
  styleUrls: ['./os-closed.component.css']
})
export class OsClosedComponent implements AfterViewInit {

  lista: OS[] = [];

  displayedColumns: string[] = ['cliente',
  'tecnico',
  'prioridade',
  //'observacoes',
  'status',
  'abertura',
  'fechamento',
  'action'];
  
  dataSource = new MatTableDataSource<OS>(this.lista);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OsService,
    private router: Router, 
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService
    ){ }

  ngAfterViewInit() {
    /*this.dataSource.paginator = this.paginator;*/
    this.findAll();
  }

  findAll():void{
    this.service.findAll().subscribe((resposta)=>{
      resposta.forEach(x => {
        if(x.status == "ENCERRADO"){
          this.lista.push(x)
        }
      })

      this.listarTecnico();
      this.listarCliente();
      console.log(this.lista)
      this.dataSource = new MatTableDataSource<OS>(this.lista);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void{
    this.router.navigate(['os/create'])
  }

  listarTecnico(): void{
    this.lista.forEach(x => {
      this.tecnicoService.findById(x.tecnico).subscribe((resposta =>{
          x.tecnico = resposta.nome
        }))
    })
  }

  listarCliente(): void{
    this.lista.forEach(x => {
      this.clienteService.findById(x.cliente).subscribe((resposta =>{
          x.cliente = resposta.nome
        }))
    })
  }

  prioridade(x: any){
    if(x == 'BAIXA'){
      return 'baixa'
    }else if(x == 'MEDIA'){
      return 'media'
    }else{
      return 'alta'
    }
  }

  

}
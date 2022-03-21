import { OS } from './../../../../models/entities/os';
import { Router, ActivatedRoute } from '@angular/router';
import { OsService } from './../../../../models/services/os.service';
import { ClienteService } from './../../../../models/services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/entities/cliente';
import { Tecnico } from 'src/app/models/entities/tecnico';
import { TecnicoService } from 'src/app/models/services/tecnico.service';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.component.html',
  styleUrls: ['./os-update.component.css']
})
export class OsUpdateComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }


  tecnicos: Tecnico[] = [];
  clientes: Cliente[] = [];

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private service: OsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.listarTecnicos();
    this.listarClientes();
  }

  findById(): void {
    this.service.findById(this.os.id).subscribe(resposta => {
      this.os = resposta;
      this.converteDados();
    })
  }

  update(): void {
    console.log(this.os);
    this.service.create(this.os).subscribe(resposta => {
    this.service.message("Ordem de Serviço Atualizada com Sucesso!");
    this.router.navigate(['os']);

    })
  }

  cancel(): void {
    this.router.navigate(['os']);
  }

  listarTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  converteDados():void{
    if(this.os.status == "ABERTO"){
      this.os.status = 0;

    }else if(this.os.status == 'ANDAMENTO'){
      this.os.status = 1;

    }else{
      this.os.status = 2;
    }

    if(this.os.prioridade == "BAIXA"){
      this.os.prioridade = 0;

    }else if(this.os.prioridade == 'MEDIA'){
      this.os.prioridade = 1;

    }else{
      this.os.prioridade = 2;
    }

  }


}

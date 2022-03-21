import { ClienteService } from './../../../../models/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from './../../../../models/entities/cliente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  id_cliente = '';

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  constructor(private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_cliente = this.route.snapshot.paramMap.get('id')!
    this.findById();

  }

  findById(): void {
    this.service.findById(this.id_cliente).subscribe(resposta => {
      this.cliente = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.id_cliente).subscribe((resposta) => {
      this.router.navigate(['clientes'])
      this.service.message('O Registro foi Deletado!')
    }, err => {
      console.log(err)
      if (err.error.error.match('Existe Ordem de Servico vinculadas a este objeto')) {
        /*this.service.message(err.error.error)*/
        this.service.message('Delete Falhou! - Pois possui Ordens de Serviço vinculadas')
      }
    }
    )
  }


  cancel(): void {
    this.router.navigate(['clientes'])
  }

}

import { Tecnico } from './../../../../models/entities/tecnico';
import { TecnicoService } from './../../../../models/services/tecnico.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telefone = new FormControl('', [Validators.minLength(11)])

  constructor(private router: Router,
    private service: TecnicoService
  ) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['tecnicos'])
  }

  create(): void {
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos'])
      this.service.message('Operação realizada com Sucesso!')
    }, err => {
      console.log(err)
      if (err.error.error.match('Já cadastrado')) {
        this.service.message(err.error.error)
      }else if(err.error.errors[0].message === 'número do registro de contribuinte individual brasileiro (CPF) inválido'){
       /* this.service.message(err.error.errors[0].message)*/
        this.service.message("CPF Inválido!")
        console.log(err)
      }
    }
    )
  }

  errorValidName(){
    if(this.nome.invalid){
      return 'O nome deve ter entre 5 e 100 caracteres!';
    }
    return false;
  }

  errorValidCpf() {
    if(this.cpf.invalid){
      return 'O nome deve ter entre 11 e 15 caracteres!';
    }
    return false;
  }

  errorValidTelefone() {
    if(this.telefone.invalid){
      return 'O nome deve ter entre 11 e 18 caracteres!';
    }
    return false;
  }
}

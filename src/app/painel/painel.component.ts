import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {
  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase = { fraseEng: '', frasePtBr: '' }

  public progresso: number = 0

  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // console.log('Componente painel foi destruído')
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }
  public verificarResposta(): void {
    if (this.rodadaFrase.frasePtBr == this.resposta) {
      // alert('A tradução está correta!')
      this.progresso += (100 / this.frases.length)
      this.rodada++
      this.atualizaRodada()
      if (this.rodada == this.frases.length) {
        this.encerrarJogo.emit('vitoria')
      }
    } else {
      // alert('A traducação está incorreta, tente novamente!')
      this.tentativas--
      if (this.tentativas === -1) {
        this.encerrarJogo.emit('derrota')
      }
    }
  }
  atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''
  }
}

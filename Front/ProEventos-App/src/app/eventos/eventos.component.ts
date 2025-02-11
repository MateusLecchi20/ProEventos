import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-eventos',
  imports: [CommonModule, FormsModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [ // Quando o elemento aparece
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [ // Quando o elemento desaparece
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class EventosComponent {

  public eventos: any = [];
  public eventosFiltrados: any = [];
  widthImg: number = 50;
  marginImg: number = 2;
  showimg: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.FiltrarEventos(this.filtroLista) : this.eventos;
  }

  FiltrarEventos(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string, local: string }) => evento.tema.toLocaleLowerCase().indexOf(filterBy) !== -1 || 
                                                   evento.local.toLocaleLowerCase().indexOf(filterBy) !== -1
    )
  }
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  alterarImagem() {
    this.showimg = !this.showimg;
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos;
      },
      error => console.log(error)
    );
  }
}

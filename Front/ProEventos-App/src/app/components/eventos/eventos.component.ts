import { Component, TemplateRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/Evento';
import { DateTimeFormatPipe } from "../../helpers/DateTimeFormat.pipe";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TituloComponent } from "../../shared/titulo/titulo.component";

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, DateTimeFormatPipe, TituloComponent],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
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
  modalRef?: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  public widthImg: number = 50;
  public marginImg: number = 2;
  public showimg: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.FiltrarEventos(this.filtroLista) : this.eventos;
  }

  public FiltrarEventos(filterBy: string): Evento[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string, local: string }) => 
        evento.tema.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filterBy) !== -1
    )
  }
  
  constructor(private eventoService: EventoService,
              private modalService: BsModalService,
              private toastr: ToastrService
              // private spinner: NgxSpinnerService
  ) { }

  public ngOnInit(): void {
    this.getEventos();
  }

  public alterarImagem(): void {
    this.showimg = !this.showimg;
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        this.toastr.error('Erro ao Carregar os Eventos', 'Erro!');
        setTimeout(() => {
          this.toastr.clear();         
        }, 4000);
      },
      complete: () => {
      }
    });
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'})
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('O Evento foi deletado com Sucesso', 'Deletado!');
  }

  decline(): void {
    this.modalRef?.hide();
  }
}

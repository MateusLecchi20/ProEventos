import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { ToastrService } from 'ngx-toastr';
import { DateTimeFormatPipe } from "@app/helpers/DateTimeFormat.pipe";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-evento-lista',
  imports: [DateTimeFormatPipe, FormsModule, CommonModule],
  templateUrl: './evento-lista.component.html',
  styleUrl: './evento-lista.component.scss',
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
export class EventoListaComponent {

  modalRef?: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public eventoId = 0;

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
              private toastr: ToastrService,
              private router: Router,
              private spinner: NgxSpinnerService
  ) { }

  public ngOnInit(): void {
    this.carregarEventos();
  }

  public alterarImagem(): void {
    this.showimg = !this.showimg;
  }

  public mostraImagem(imagemURL: string): string {
    return (imagemURL !== '')
      ? `${environment.apiURL}resources/images/${imagemURL}`
      : 'assets/img/semImagem.png';
  }

  public carregarEventos(): void {
    this.spinner.show();

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
    }).add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, eventoId: number): void {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'})
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    
    this.eventoService.deleteEvento(this.eventoId).subscribe({
      next: (result: any) => {
        if (result.message === 'Deletado') {
          this.toastr.success('O Evento foi deletado com Sucesso.', 'Deletado!');
          this.carregarEventos();
        }
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar deletar o evento ${this.eventoId}`, 'Erro');
      },
    }).add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number): void{
    this.router.navigate([`eventos/detalhe/${id}`]);
  }
}

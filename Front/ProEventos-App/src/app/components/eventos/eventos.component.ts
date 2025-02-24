import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TituloComponent } from "../../shared/titulo/titulo.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, TituloComponent],
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
  ngOnInit(): void {
    
  }
}

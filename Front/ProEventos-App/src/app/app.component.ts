import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventosComponent } from "./components/eventos/eventos.component";
import { PalestrantesComponent } from "./components/palestrantes/palestrantes.component";
import { NavComponent } from './shared/nav/nav.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { TituloComponent } from './shared/titulo/titulo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EventosComponent, PalestrantesComponent, NavComponent, ContatosComponent, DashboardComponent, PerfilComponent, TituloComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'ProEventos-App';
}

import { Component, OnInit } from '@angular/core';
import { TituloComponent } from "../../shared/titulo/titulo.component";

@Component({
  selector: 'app-palestrantes',
  standalone: true,
  templateUrl: './palestrantes.component.html',
  styleUrls: ['./palestrantes.component.scss'],
  imports: [TituloComponent]
})
export class PalestrantesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

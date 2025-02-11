import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, CollapseModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}

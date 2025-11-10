import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ConsignaComponent } from './shared/components/consigna/consigna.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ConsignaComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private readonly router: Router) {}

  isReflectionRoute(): boolean {
    return this.router.url.startsWith('/reflection');
  }
}

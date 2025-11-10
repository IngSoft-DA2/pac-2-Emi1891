import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ReflectionStoreService } from '../shared/services/reflection-store.service';

@Component({
  selector: 'app-reflection-page',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './reflection-page.component.html',
  styleUrl: './reflection-page.component.css',
})
export class ReflectionPageComponent {
  protected readonly store = inject(ReflectionStoreService);

  protected loadImporters(): void {
    this.store.loadImporters();
  }
}


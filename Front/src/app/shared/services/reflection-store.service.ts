import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ReflectionService } from './reflection.service';

@Injectable({
  providedIn: 'root',
})
export class ReflectionStoreService {
  constructor(private readonly reflectionService: ReflectionService) {}

  visitCount = 0;
  loading = false;
  importers: string[] = [];
  errorMessage = '';
  private wasLoaded = false;

  incrementVisit(): number {
    this.visitCount += 1;
    return this.visitCount;
  }

  loadImporters(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.reflectionService.getImporters().subscribe({
      next: (dlls) => {
        this.importers = dlls;
        this.loading = false;
        this.wasLoaded = true;
      },
      error: (error) => {
        this.importers = [];
        this.loading = false;
        this.wasLoaded = true;
        this.errorMessage = this.buildErrorMessage(error);
      },
    });
  }

  get isIdle(): boolean {
    return !this.loading && !this.wasLoaded && !this.errorMessage;
  }

  get isEmpty(): boolean {
    return !this.loading && this.wasLoaded && this.importers.length === 0 && !this.errorMessage;
  }

  private buildErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (typeof error.error === 'string' && error.error.trim().length > 0) {
        return error.error;
      }

      if (error.error?.title) {
        return error.error.title;
      }

      if (error.status === 0) {
        return 'No fue posible contactar al servidor. Verifica que el backend este en ejecucion.';
      }

      return error.statusText || `Error HTTP ${error.status}`;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return 'Ocurrio un error inesperado.';
  }
}


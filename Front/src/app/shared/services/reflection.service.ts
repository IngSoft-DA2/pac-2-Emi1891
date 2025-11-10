import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReflectionService {
  private readonly http = inject(HttpClient);

  getImporters(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5248/api/reflection/importers');
  }
}


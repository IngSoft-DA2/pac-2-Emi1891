import { Routes } from '@angular/router';
import { reflectionLimitGuard } from './shared/guards/reflection-limit.guard';

export const routes: Routes = [
  {
    path: 'reflection',
    canActivate: [reflectionLimitGuard],
    loadComponent: () =>
      import('./reflection/reflection-page.component').then((m) => m.ReflectionPageComponent),
  },
];

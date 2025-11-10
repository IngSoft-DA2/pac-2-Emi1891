import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ReflectionStoreService } from '../services/reflection-store.service';

const VISIT_LIMIT = 20;

export const reflectionLimitGuard: CanActivateFn = () => {
  const store = inject(ReflectionStoreService);
  const router = inject(Router);

  const currentVisits = store.incrementVisit();

  if (currentVisits > VISIT_LIMIT) {
    return router.createUrlTree(['/']);
  }

  return true;
};


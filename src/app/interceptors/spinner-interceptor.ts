import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Spinner } from '../services/spinner';
import { catchError, finalize, throwError } from 'rxjs';
import { Error } from '../services/error';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(Spinner);
  const errorService = inject(Error);

  if (req.headers.get('X-Search') === 'true') {
    const cleanReq = req.clone({ headers: req.headers.delete('X-Search') });
    return next(cleanReq);
  }

  spinner.show();
  return next(req).pipe(
    catchError((error) => {
      spinner.hide();
      errorService.show();
      return throwError(() => error);
    }),
    finalize(() => spinner.hide())
  );
};

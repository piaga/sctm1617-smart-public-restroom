import { CanActivate, Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';

/**
 * Una guard che previene l'accesso ad ogni funzionalità dell'applicazione (ad eccezione della login) qualora non si possegga nel proprio indexedDB un loginToken.
 * In caso di fallita autenticazione, la guard effettua un redirect all'indirizzo /login.
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private localStorage: LocalStorage, private router: Router) {}

    canActivate(): Observable<boolean> {
      return this.localStorage.getItem('loginToken').pipe(map(value => {
          if (value != null)
              return true;
          this.router.navigate(['/login']);
      }));
    }
  }

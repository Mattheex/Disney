// loader.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject<boolean>(false);

  getLoaderState(): Observable<boolean> {
    return this.loaderSubject.asObservable();
  }

  showLoader(): void {
    this.loaderSubject.next(true);
  }

  hideLoader(): void {
    this.loaderSubject.next(false);
  }
}

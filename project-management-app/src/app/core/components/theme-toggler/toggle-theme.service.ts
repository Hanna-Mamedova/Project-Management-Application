import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleThemeService {
  darkThemeOn: boolean = false;

  private darkThemeOn$$ = new BehaviorSubject(this.darkThemeOn);

  darkThemeOn$ = this.darkThemeOn$$.pipe();

  constructor() { }

  switchTheme(): void {
    this.darkThemeOn = !this.darkThemeOn;
    this.darkThemeOn$$.next(this.darkThemeOn);
  }
}

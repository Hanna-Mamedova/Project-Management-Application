import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';


@Injectable({
  providedIn: 'root',
})
export class ToggleThemeService {
  darkThemeOn: boolean = false;

  private darkThemeOn$$ = new BehaviorSubject(this.darkThemeOn);

  darkThemeOn$ = this.darkThemeOn$$.pipe();

  constructor(
    private overlayContainer: OverlayContainer,
  ) { }

  switchTheme(): void {
    this.darkThemeOn = !this.darkThemeOn;
    this.darkThemeOn$$.next(this.darkThemeOn);
    this.applyThemeToOverlyContainers(this.darkThemeOn);
  }

  applyThemeToOverlyContainers(darkModeUI: boolean): void {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const classesToRemove = Array.from(overlayContainerClasses).filter(item => item.includes('app-theme-'));
    overlayContainerClasses.remove(...classesToRemove);
    this.overlayContainer.getContainerElement().classList.add(darkModeUI ? 'dark-theme' : 'light-theme');
  }
}

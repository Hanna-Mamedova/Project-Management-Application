import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Theme } from '../../constants/constants';


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

  checkSavedTheme(): void {
    const savedTheme: string | null = localStorage.getItem('theme');
    this.darkThemeOn = savedTheme === Theme.DARK ? true : false;
    this.darkThemeOn$$.next(this.darkThemeOn);
  }

  switchTheme(): void {
    this.darkThemeOn = !this.darkThemeOn;
    const currentTheme = this.darkThemeOn ? Theme.DARK : Theme.LIGHT;
    this.darkThemeOn$$.next(this.darkThemeOn);
    this.applyThemeToOverlyContainers(this.darkThemeOn);
    localStorage.setItem('theme', currentTheme);
  }

  applyThemeToOverlyContainers(darkModeUI: boolean): void {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const classesToRemove = Array.from(overlayContainerClasses).filter(item => item.includes('app-theme-'));
    overlayContainerClasses.remove(...classesToRemove);
    this.overlayContainer.getContainerElement().classList.add(darkModeUI ? 'dark-theme' : 'light-theme');
  }
}

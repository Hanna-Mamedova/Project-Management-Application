import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { Store } from '@ngrx/store';
import { appLoaded } from './core/store/actions/app.actions';
import { ToggleThemeService } from './core/components/theme-toggler/toggle-theme.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public darkModeUI: boolean;

  sub: Subscription;

  constructor(
    private translateService: TranslateService,
    private store: Store,
    private toggleThemeService: ToggleThemeService,
  ) {}

  @HostBinding('class')
  public get themeMode() {
    return this.darkModeUI ? 'dark-theme' : 'light-theme';
  }

  ngOnInit(): void {
    this.store.dispatch(appLoaded());
    this.translateService.use(environment.defaultLocale);
    this.sub = this.toggleThemeService.darkThemeOn$.subscribe(data => this.darkModeUI = data);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

}

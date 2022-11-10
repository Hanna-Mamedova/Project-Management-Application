import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { Store } from '@ngrx/store';
import { appLoaded } from './core/store/actions/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private translateService: TranslateService,
    private store: Store,
    ) {}

  ngOnInit(): void {
    this.store.dispatch(appLoaded());
    this.translateService.use(environment.defaultLocale);
  }
}

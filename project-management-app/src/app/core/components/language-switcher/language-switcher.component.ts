import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent {
  lang: string = this.langService.lang$.value;

  @ViewChild('flagIcon') flagIcon: ElementRef;

  constructor(private translateSevice: TranslateService, private langService: LangService) { }

  changeLang(): void {
    if (this.lang === 'en') {
      this.langService.lang$.next('py');
      this.lang = this.langService.lang$.value;
      this.flagIcon.nativeElement.src = './assets/img/russia.png';
    } else {
      this.langService.lang$.next('en');
      this.lang = this.langService.lang$.value;
      this.flagIcon.nativeElement.src = './assets/img/united-kingdom.png';
    }
    this.translateSevice.use(this.lang);
  }
}

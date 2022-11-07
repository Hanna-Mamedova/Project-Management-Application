import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent {
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Russian' },
  ];

  lang = 'en';

  @ViewChild('flagIcon') flagIcon: ElementRef;

  constructor(private translateSevice: TranslateService) { }

  // changeLang(lang: string) {
  //   console.log(lang);
  //   this.translateSevice.use(lang);
  // }

  changeLang() {
    if (this.lang === 'en') {
      this.lang = 'ru';
      this.flagIcon.nativeElement.src = './assets/img/russia.png';
    } else {
      this.lang = 'en';
      this.flagIcon.nativeElement.src = './assets/img/united-kingdom.png';
    }
    this.translateSevice.use(this.lang);
  }
}

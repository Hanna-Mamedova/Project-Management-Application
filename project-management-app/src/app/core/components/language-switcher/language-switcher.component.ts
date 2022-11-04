import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {
  languageList = [
    {code: 'en', label: 'English'},
    {code: 'ru', label: 'Russian'},
  ];

  constructor(private translateSevice: TranslateService) { }

  ngOnInit(): void {
  }

  changeLang(lang: string) {
    this.translateSevice.use(lang);
  }

}

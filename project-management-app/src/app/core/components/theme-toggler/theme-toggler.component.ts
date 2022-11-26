import { Component } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ToggleThemeService } from './toggle-theme.service';

@Component({
  selector: 'app-theme-toggler',
  templateUrl: './theme-toggler.component.html',
  styleUrls: ['./theme-toggler.component.scss'],
})
export class ThemeTogglerComponent {

  public title = 'Fleet Management';

  private darkThemeIcon = 'nightlight_round';

  private lightThemeIcon = 'wb_sunny';

  public lightDarkToggleIcon = this.darkThemeIcon;

  constructor(private toggleThemeService: ToggleThemeService) { }

  public doToggleLightDark(toggle: MatSlideToggle) {
    this.lightDarkToggleIcon = toggle.checked ? this.darkThemeIcon : this.lightThemeIcon;
    this.toggleThemeService.switchTheme();
  }

}

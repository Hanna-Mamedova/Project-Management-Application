import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/services/auth.service';

window.addEventListener('scroll', () => {
  const scrollPosition: number = window.scrollY;
  const header = document.querySelector('.header') as HTMLElement;

  if (scrollPosition > 50)  header.classList.add('sticky');
  else header.classList.remove('sticky');
});

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() sidenavHandle: MatSidenav;

  constructor(public authService: AuthService) {}
}

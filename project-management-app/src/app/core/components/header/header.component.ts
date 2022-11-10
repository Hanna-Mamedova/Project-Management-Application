import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

window.addEventListener('scroll', () => {
  const scrollPosition: number = window.scrollY;
  const header = document.querySelector('.header') as HTMLElement;
  const headerBackground = document.querySelector('.block') as HTMLElement;

  if (scrollPosition > 50) {
    header.classList.add('sticky');
    headerBackground.classList.add('block--visible');
  } else {
    header.classList.remove('sticky');
    headerBackground.classList.remove('block--visible');
  } 
});

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public auth: AuthService) {}
}

import { Component, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-team-block',
  templateUrl: './team-block.component.html',
  styleUrls: ['./team-block.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class TeamBlockComponent {

}

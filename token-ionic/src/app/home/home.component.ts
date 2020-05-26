import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public imagesUrl;
  sliderOne: any;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  constructor() {
    this.sliderOne = {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 1,
            image: 'http://localhost:8100/assets/images/image1.jpg'
          },
          {
            id: 2,
            image: 'http://localhost:8100/assets/images/image2.jpg'
          },
          {
            id: 3,
            image: 'http://localhost:8100/assets/images/image3.jpg'
          }
        ]
      };
  }

  ngOnInit() {
  }

}

import { Component, Input, OnInit } from '@angular/core';

const MAX_STAR_COUNT = 5;

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() rating: number | undefined = 0;
  @Input() starCount = MAX_STAR_COUNT;
  ratingArr: number[] = [];

  ngOnInit() {
    for (let index = 0; index < MAX_STAR_COUNT; index++) {
      this.ratingArr.push(index);
    }
  }
}

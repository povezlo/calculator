import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingComponent } from './rating.component';
import { ShowRatingStarPipe } from './show-rating-stars.pipe';

@NgModule({
  declarations: [RatingComponent, ShowRatingStarPipe],
  imports: [CommonModule],
  exports: [RatingComponent],
})
export class RatingModule {}

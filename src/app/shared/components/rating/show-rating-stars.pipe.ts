import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showStar'
})
export class ShowRatingStarPipe implements PipeTransform {

  transform(rating = 0, starPosition: number): unknown {

    if (rating >= starPosition + 1) {
      return 'star';
    }
   
    if(rating > starPosition) {
      return 'star_half'
    }

    return 'star_border';
  }

}

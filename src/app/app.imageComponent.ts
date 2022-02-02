import { Component, Input } from '@angular/core';

@Component({
    selector: 'movieImage',
    template: `
    <img src="http://image.tmdb.org/t/p/w185/{{moviePosterPath}}"/> 
  `
})
export class ImageComponent {
    @Input()
    moviePosterPath!: any;
}

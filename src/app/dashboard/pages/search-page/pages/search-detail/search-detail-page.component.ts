import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { MovieInfo } from 'src/app/models/movie-info.model';

@Component({
  selector: 'app-search-detail-page',
  templateUrl: './search-detail-page.component.html',
  styleUrls: ['./search-detail-page.component.scss'],
})
export class SearchDetailPageComponent implements OnInit {
  movieInfo!: Observable<MovieInfo>;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.movieInfo = this.activatedRoute.data.pipe(
      map((data): MovieInfo => data['movieInfo'])
    );
  }
}

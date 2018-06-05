import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MovieFindService } from 'src/app/core/movie-find.service';
import { Movie } from 'src/app/core/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchInput: FormControl = new FormControl('');
  movies: Movie[] = [];
  myError: any;


  constructor(private movieFindService: MovieFindService) {
  }

  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe((value) => {
        this.movies.length = 0;
        this.movieFindService.find(value).subscribe(data => {
            data.forEach(item => item.results.forEach(it => {
              this.movies.push(new Movie(it.original_title, it.original_language, it.overview, it.poster_path, it.release_date));
            }));
          },
          (err) => this.myError = err);
      });
  }
}

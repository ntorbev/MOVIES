import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchInput: FormControl = new FormControl('');

  constructor() {
  }

  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      // TODO call service for movie search
    });
  }
}

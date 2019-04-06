import { Component, AfterViewInit } from '@angular/core';
import { PhonenumberService } from './../services/phonenumber.service';
import { Phonenumber } from '../models/phonenumber.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  limit = 1;
  sort = 'asc';
  max: string;
  min: string;
  phonenumbers = [];
  size: number;
  invalidLimit = false;
  loading = false;

  constructor(private phonenumberService: PhonenumberService) {
    this.retrieve();
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  onResize() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    if (window.innerWidth > 600) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }

  setLimit(value: any) {
    this.limit = +value;
    if (value > 50 || value < 1 || Number.isNaN(value)) {
      this.invalidLimit = true;
    } else {
      this.invalidLimit = false;
    }
  }

  setSort(value: any) {
    this.sort = value;
  }

  generate() {
    this.loading = true;
    this.phonenumberService
      .generateNumber(this.limit, this.sort)
      .subscribe((data: Phonenumber) => {
        const { size, min, max, phonenumbers } = data;
        this.min = min;
        this.max = max;
        this.phonenumbers = phonenumbers;
        this.size = size;
        this.loading = false;
      });
  }
  retrieve() {
    this.loading = true;
    this.phonenumberService
      .getAllNumbers(this.sort)
      .subscribe((data: Phonenumber) => {
        const { size, min, max, phonenumbers } = data;
        this.min = min;
        this.max = max;
        this.phonenumbers = phonenumbers;
        this.size = size;
        this.loading = false;
      });
  }
}

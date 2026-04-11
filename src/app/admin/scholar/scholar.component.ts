import { Component, OnInit } from '@angular/core';
import { ScholarService } from '../../services/scholar.service';


@Component({
  selector: 'app-scholar',
  templateUrl: './scholar.component.html'
})
export class ScholarComponent implements OnInit {

  scholars: any[] = [];

  constructor(private service: ScholarService) {}

  ngOnInit() {
    this.service.getAll().subscribe(res => this.scholars = res);
  }
}
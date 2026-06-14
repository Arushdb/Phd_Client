import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule,FormsModule  ],
  selector: 'app-visits',
  templateUrl: './visits.component.html'
})
export class VisitsComponent {

  // =========================
  // INPUT
  // =========================
  @Input() visits: any[] = [];

  // =========================
  // OUTPUT
  // =========================
  @Output() visitsChange = new EventEmitter<any[]>();

  ngOnInit() {
    if (!this.visits || this.visits.length === 0) {
      this.visits = [this.createRow()];
    }
  }

  // =========================
  // CREATE ROW
  // =========================
  createRow() {
    return {
      institute: '',
      contactPerson: '',
      designation: '',
      place: '',
      dates: '',
      year: '',
      purpose: ''
    };
  }

  // =========================
  // ADD
  // =========================
  addRow() {
    this.visits.push(this.createRow());
    this.emitChanges();
  }

  // =========================
  // REMOVE
  // =========================
  removeRow(i: number) {
    if (this.visits.length === 1) return;
    this.visits.splice(i, 1);
    this.emitChanges();
  }

  // =========================
  // EMIT
  // =========================
  emitChanges() {
    this.visitsChange.emit(this.visits);
  }
}
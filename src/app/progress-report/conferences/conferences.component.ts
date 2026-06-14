import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conferences',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './conferences.component.html'
})
export class ConferencesComponent {

  // =========================
  // INPUT
  // =========================
  @Input() conferences: any[] = [];

  // =========================
  // OUTPUT
  // =========================
  @Output() conferencesChange = new EventEmitter<any[]>();

  ngOnInit() {
    if (!this.conferences || this.conferences.length === 0) {
      this.conferences = [this.createRow()];
    }
  }

  // =========================
  // CREATE ROW
  // =========================
  createRow() {
    return {
      authors: '',
      title: '',
      type: '',
      level: '',
      organizer: '',
      place: '',
      dates: '',
      presentationType: '',
      participation: '',
      funding: ''
    };
  }

  // =========================
  // ADD
  // =========================
  addRow() {
    this.conferences.push(this.createRow());
    this.emitChanges();
  }

  // =========================
  // REMOVE
  // =========================
  removeRow(i: number) {
    if (this.conferences.length === 1) return;
    this.conferences.splice(i, 1);
    this.emitChanges();
  }

  // =========================
  // EMIT
  // =========================
  emitChanges() {
    this.conferencesChange.emit(this.conferences);
  }
}
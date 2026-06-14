import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './publications.component.html'
})
export class PublicationsComponent {

  // =========================
  // INPUT (from parent)
  // =========================
  @Input() publications: any[] = [];

  // =========================
  // OUTPUT (to parent)
  // =========================
  @Output() publicationsChange = new EventEmitter<any[]>();

  ngOnInit() {
    if (!this.publications || this.publications.length === 0) {
      this.publications = [this.createRow()];
    }
  }

  // =========================
  // CREATE ROW
  // =========================
  createRow() {
    return {
      authors: '',
      title: '',
      journal: '',
      volume: '',
      pageNo: '',
      year: '',
      impact: '',
      indexing: ''
    };
  }

  // =========================
  // ADD
  // =========================
  addRow() {
    this.publications.push(this.createRow());
    this.emitChanges();
  }

  // =========================
  // REMOVE
  // =========================
  removeRow(i: number) {
    if (this.publications.length === 1) return;
    this.publications.splice(i, 1);
    this.emitChanges();
  }

  // =========================
  // EMIT
  // =========================
  emitChanges() {
    this.publicationsChange.emit(this.publications);
  }
}
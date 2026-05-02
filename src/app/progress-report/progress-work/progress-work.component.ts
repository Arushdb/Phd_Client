import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-progress-work',
  templateUrl: './progress-work.component.html'
})
export class ProgressWorkComponent {

  // =========================
  // INPUT (from parent)
  // =========================
  @Input() progressList: any[] = [];

  // =========================
  // OUTPUT (to parent)
  // =========================
  @Output() progressChange = new EventEmitter<any[]>();

  // =========================
  // INIT
  // =========================
  ngOnInit() {
    if (!this.progressList || this.progressList.length === 0) {
      this.progressList = [this.createRow()];
    }
  }

  // =========================
  // CREATE EMPTY ROW
  // =========================
  createRow() {
    return {
      stage: '',
      objectiveNo: '',
      completion: ''
    };
  }

  // =========================
  // ADD ROW
  // =========================
  addRow() {
    this.progressList.push(this.createRow());
    this.emitChanges();
  }

  // =========================
  // REMOVE ROW
  // =========================
  removeRow(index: number) {

    if (this.progressList.length === 1) return;

    this.progressList.splice(index, 1);
    this.emitChanges();
  }

  // =========================
  // TRACK CHANGES
  // =========================
  emitChanges() {
    this.progressChange.emit(this.progressList);
  }

  // =========================
  // VALIDATION
  // =========================
  isValid(): boolean {
    return this.progressList.every(row =>
      row.stage && row.objectiveNo && row.completion !== ''
    );
  }
}
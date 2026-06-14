import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressWork } from '../../interfaces/progress-work';

@Component({
  standalone: true,
  imports: [CommonModule,FormsModule],
  selector: 'app-progress-work',
  templateUrl: './progress-work.component.html'
})
export class ProgressWorkComponent {

  // =========================
  // INPUT (from parent)
  // =========================
  //@Input() progressList: any[] = [];
  @Input() progressList: ProgressWork[] = [];

  // =========================
  // OUTPUT (to parent)
  // =========================
  @Output() progressChange = new EventEmitter<ProgressWork[]>();
   @Output() rowDeleted = new EventEmitter<number>();

  // =========================
  // INIT
  // =========================
  ngOnInit() {
    // if (!this.progressList || this.progressList.length === 0) {
    //   this.progressList = [this.createRow()];
    // }
     console.log('ngOnInit', this.progressList);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['progressList']) {
      console.log('Progress list received:', this.progressList);
    }   
  }  

  // =========================
  // CREATE EMPTY ROW
  // =========================
  createRow() {
    const row: ProgressWork = {
      stageOfResearch: '',
      objectiveNo: '',
      completionPercentage: 0
    };
    return row;
  }

  // =========================
  // Save ROW
  // =========================
  saveRow() {
     if (!this.isValid()) {
    alert('Please complete all existing rows.');
    return;
  }
  // Save only completed rows
  this.progressChange.emit([...this.progressList]);

  // Now add a new empty row for the user
  this.progressList.push(this.createRow());
   
    
  }
  addRow() {
    this.progressList.push(this.createRow()); 
  }


  // =========================
  // REMOVE ROW
  // =========================
  // removeRow(index: number) {

  //   if (this.progressList.length === 1) return;

  //   this.progressList.splice(index, 1);
  //   this.emitChanges();
  // }

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
      row.stageOfResearch && row.objectiveNo && row.completionPercentage >= 0 && row.completionPercentage <= 100
    );
  }

 

removeRow(index: number) {

  if (this.progressList.length === 1) {
    return;
  }

  const deletedRow = this.progressList[index];

  this.progressList.splice(index, 1);

  if (deletedRow.progressWorkId) {
    this.rowDeleted.emit(deletedRow.progressWorkId);
  }

 // this.emitChanges();
}
}
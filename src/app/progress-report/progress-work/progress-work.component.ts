
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressWork } from '../../interfaces/progress-work';
import { ProgressWorkService } from '../../services/progress-work.service';


@Component({
  selector: 'app-progress-work',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './progress-work.component.html'
})
export class ProgressWorkComponent implements OnInit {

  @Input() reportId!: number;
  @Input() canEdit: boolean = false;
  successMessage: string = '';
errorMessage: string = '';

  progressWorks: ProgressWork[] = [];
  saving: number | null = null;

  constructor(
    private progressWorkService: ProgressWorkService
  ) {}

  ngOnInit(): void {
    this.getProgressWork();
  }

  getProgressWork(): void {
    this.progressWorkService
      .getProgressWork(this.reportId)
      .subscribe({
        next: (data) => {
          this.progressWorks = [...data];

          // Add a blank row for a new objective
          if (this.canEdit) {
            this.addEmptyRow();
          }
        },
        error: (err) => {
           this.errorMessage = 'Unable to load progress work.';
  console.error('Error loading progress work', err);
          console.error('Error loading progress work', err);
        }
      });
  }

  addEmptyRow(): void {
    if (!this.canEdit) return;

    const last = this.progressWorks[
      this.progressWorks.length - 1
    ];

    // Avoid adding multiple blank rows
    if (last && !last.id && !last.stage &&
        !last.objectiveNo &&
        last.completionPercentage == null) {
      return;
    }

    this.progressWorks.push({
      reportId: this.reportId,
      stage: '',
      objectiveNo: '',
      completionPercentage: null
    });
  }

  isRowComplete(work: ProgressWork): boolean {
    return !!work.stage?.trim() &&
           !!work.objectiveNo?.trim() &&
           work.completionPercentage !== null &&
           work.completionPercentage !== undefined &&
           work.completionPercentage >= 0 &&
           work.completionPercentage <= 100;
  }

  saveRow(index: number): void {
    if (!this.canEdit) return;

    const work = this.progressWorks[index];
     this.successMessage = '';
  this.errorMessage = '';

    if (!this.isRowComplete(work)) {
      this.errorMessage =
      'Please complete all fields correctly. Completion must be between 0 and 100.';

      
      return;
    }
     const isUpdate = !!work.id;

    this.saving = index;

    const request = work.id
      ? this.progressWorkService.updateProgressWork(
          this.reportId, work.id, work)
      : this.progressWorkService.saveProgressWork(
          this.reportId, work);

    request.subscribe({
      next: (saved) => {
        this.progressWorks[index] = saved;
        this.saving = null;
          this.successMessage = isUpdate
        ? 'Objective updated successfully.'
        : 'Objective saved successfully.';

        // Add the next blank row after a successful save
        this.addEmptyRow();
      },
      error: (err) => {
        this.saving = null;
         this.errorMessage =
        err.error?.message ||
        'Unable to save objective. Please try again.';
        console.error('Error saving progress work', err);
        
      }
    });
  }

  deleteRow(index: number): void {
    if (!this.canEdit) return;

    const work = this.progressWorks[index];

    // Remove an unsaved blank or incomplete row locally
    if (!work.id) {
      this.progressWorks.splice(index, 1);
      this.addEmptyRow();
      return;
    }

    if (!confirm('Are you sure you want to delete this objective?')) {
      return;
    }

    this.progressWorkService
      .deleteProgressWork(this.reportId, work.id)
      .subscribe({
        next: () => {
          this.progressWorks.splice(index, 1);
           this.successMessage =
          'Objective deleted successfully.';
          this.addEmptyRow();
        },
        error: (err) => {
           this.saving = null;
        this.errorMessage =
          err.error?.message ||
          'Unable to delete objective. Please try again.';
          console.error('Error deleting progress work', err);
          
        }
      });
  }
  clearMessages(): void {
  this.successMessage = '';
  this.errorMessage = '';
}
}
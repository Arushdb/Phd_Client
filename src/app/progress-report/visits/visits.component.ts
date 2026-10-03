import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { VisitsService } from '../../services/visits.service';
import { Visit } from '../../interfaces/visit';

@Component({
  selector: 'app-visits',
  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css'],
})
export class VisitsComponent implements OnInit {
 
   // =========================
  // INPUT
  // =========================
   loading = false;
  errorMessage = '';
  successMessage = '';
  // ============================================
  // INPUT
  // ============================================

  @Input() reportId!: number;
  @Input() canEdit: boolean = false;

  // ============================================
  // DATA
  // ============================================

  visits: Visit[] = [];

  constructor(private visitsService: VisitsService) {}

  // ============================================
  // INIT
  // ============================================

  ngOnInit(): void {
    this.getVisits();
  }

  // ============================================
  // GET VISITS
  // ============================================

  getVisits(): void {
    if (!this.reportId) {
      console.error('Report ID is null. Cannot fetch visits.');

      return;
    }

    this.visitsService.getVisits(this.reportId).subscribe({
      next: (res) => {
        console.log('Visits data:', res);

        // Load existing records
        this.visits = [...res];

        // Add empty row for new entry
        this.visits.push(this.createEmptyVisit());
      },

      error: (error) => {
        console.error('Error fetching visits:', error);
      },
    });
  }

  // ============================================
  // CREATE EMPTY VISIT
  // ============================================

  createEmptyVisit(): Visit {
    return {
      reportId: this.reportId,

      institute: '',

      contactPerson: '',

      designation: '',

      place: '',

      dates: '',

      year: '',

      purpose: '',
    };
  }

  // ============================================
  // SAVE / UPDATE ROW
  // ============================================

  saveRow(index: number): void {
     if (!this.canEdit) {
    return;
  }

    const visit = this.visits[index];

    // ============================================
    // CHECK REPORT ID
    // ============================================

    if (!this.reportId) {
      alert('Progress report has not been created yet.');

      return;
    }

    // ============================================
    // VALIDATE
    // ============================================

    if (!this.isVisitComplete(visit)) {
      alert('Please fill all visit details before saving.');

      return;
    }

      this.errorMessage = '';
    this.successMessage = '';

    // ============================================
    // EXISTING RECORD -> UPDATE
    // ============================================

    if (visit.id) {
      this.visitsService.updateVisit(this.reportId, visit.id, visit).subscribe({
        next: (updatedVisit) => {
          console.log('Visit updated successfully:', updatedVisit);

          this.visits[index] = updatedVisit;
 this.successMessage = 'Visit updated successfully.';

          this.ensureEmptyRow();
        },

        error: (error) => {
          console.error('Error updating visit:', error);
this.errorMessage = 'Unable to update visit.';
        
                  },
      });

      return;
    }

    // ============================================
    // NEW RECORD -> INSERT
    // ============================================

    this.visitsService.saveVisit(this.reportId, visit).subscribe({
      next: (savedVisit) => {
        console.log('Visit saved successfully:', savedVisit);

        // Replace temporary row
        this.visits[index] = savedVisit;
        this.successMessage = 'Visit saved successfully.';

        // Add new empty row
        this.ensureEmptyRow();
      },

      error: (error) => {
        console.error('Error saving visit:', error);

        this.errorMessage = 'Unable to save visit.';
      },
    });
  }

  // ============================================
  // VALIDATION
  // ============================================

  isVisitComplete(visit: Visit): boolean {
    return !!(
      visit.institute?.trim() &&
      visit.contactPerson?.trim() &&
      visit.designation?.trim() &&
      visit.place?.trim() &&
      visit.dates?.trim() &&
      String(visit.year ?? '').trim() &&
      visit.purpose?.trim()
    );
  }

  // ============================================
  // ENSURE EMPTY ROW
  // ============================================

  ensureEmptyRow(): void {
    const last = this.visits[this.visits.length - 1];

    // Already has an empty row
    if (last && !last.id && !this.isVisitComplete(last)) {
      return;
    }

    this.visits.push(this.createEmptyVisit());
  }

  // ============================================
  // ADD ROW
  // ============================================

  addRow(): void {
     if (!this.canEdit) {
    return;
  }

    this.visits.push(this.createEmptyVisit());
  }

  // ============================================
  // DELETE ROW
  // ============================================

  deleteRow(index: number): void {
     if (!this.canEdit) {
    return;
  }

    const visit = this.visits[index];

    // ============================================
    // UNSAVED ROW
    // ============================================

    if (!visit.id) {
      this.visits.splice(index, 1);

      return;
    }

    // ============================================
    // CHECK REPORT ID
    // ============================================

    if (!this.reportId) {
      console.error('Report ID is null. Cannot delete visit.');

      return;
    }
this.errorMessage = '';
    this.successMessage = '';
    // ============================================
    // DELETE DATABASE RECORD
    // ============================================

    this.visitsService.deleteVisit(this.reportId, visit.id).subscribe({
      next: () => {
        console.log('Visit deleted successfully');

        // Remove from UI
        this.visits.splice(index, 1);
 this.successMessage = 'Visit deleted successfully.';

        // Make sure there is an empty row
        this.ensureEmptyRow();
      },

      error: (error) => {
        console.error('Error deleting visit:', error);

        this.errorMessage = 'Unable to delete visit.';
      },
    });
  }
}

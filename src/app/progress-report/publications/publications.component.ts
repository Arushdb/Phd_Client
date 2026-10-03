
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Publication } from '../../interfaces/Publication';
import { PublicationsService } from '../../services/publications.service';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publications.component.html'
})
export class PublicationsComponent implements OnInit, OnChanges {

  @Input() reportId!: number;
  @Input() canEdit: boolean = false;

  publications: Publication[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private publicationsService: PublicationsService
  ) {}

  ngOnInit(): void {
    if (this.reportId) {
      this.loadPublications();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reportId'] && !changes['reportId'].firstChange) {
      if (this.reportId) {
        this.loadPublications();
      } else {
        this.publications = [];
      }
    }
  }

  // Create a blank publication row
  createRow(): Publication {
    return {
      authors: '',
      title: '',
      journal: '',
      volume: '',
      pageNo: '',
      year: 0,
      impact: '',
      indexing: ''
    };
  }

  // Load records from database
  loadPublications(): void {
    this.loading = true;
    this.errorMessage = '';

    this.publicationsService.getPublications(this.reportId)
      .subscribe({
        next: (data) => {
          this.publications = data || [];

          if (this.publications.length === 0) {
            this.publications.push(this.createRow());
          }

          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading publications:', err);
          this.errorMessage = 'Unable to load publications.';
          this.loading = false;
        }
      });
  }

  // Add a new row
  addRow(): void {

      if (!this.canEdit) {
    return;
  }
    
    this.publications.push(this.createRow());
    this.clearMessages();
  }

  // Check if row is complete
  isRowValid(row: Publication): boolean {
    return !!(
      row.authors?.trim() &&
      row.title?.trim() &&
      row.journal?.trim() &&
      row.volume?.trim() &&
      row.pageNo?.trim() &&
      row.year &&
      row.impact?.trim() &&
      row.indexing?.trim()
    );
  }

  // Save or update an individual row
  saveRow(index: number): void {
      if (!this.canEdit) {
    return;
  }
    const publication = this.publications[index];

    if (!this.isRowValid(publication)) {
      this.errorMessage = 'Please complete all publication fields.';
      this.successMessage = '';
      return;
    }

    this.clearMessages();

    if (publication.id) {
      this.publicationsService.updatePublication(
        this.reportId,
        publication.id,
        publication
      ).subscribe({
        next: (updated) => {
          this.publications[index] = updated;
          this.publications = [...this.publications];
          this.successMessage = 'Publication updated successfully.';
        },
        error: (err) => {
          console.error('Error updating publication:', err);
          this.errorMessage = 'Unable to update publication.';
        }
      });
    } else {
      this.publicationsService.savePublication(
        this.reportId,
        publication
      ).subscribe({
        next: (saved) => {
          this.publications[index] = saved;
          this.publications = [...this.publications];
          this.successMessage = 'Publication saved successfully.';
        },
        error: (err) => {
          console.error('Error saving publication:', err);
          this.errorMessage = 'Unable to save publication.';
        }
      });
    }
  }

  // Delete a row
  deleteRow(index: number): void {
  if (!this.canEdit) {
    return;
  }

    const publication = this.publications[index];

    if (!confirm('Are you sure you want to delete this publication?')) {
      return;
    }

    this.clearMessages();

    // Unsaved row: remove locally only
    if (!publication.id) {
      this.publications.splice(index, 1);

      if (this.publications.length === 0) {
        this.publications.push(this.createRow());
      }
      return;
    }

    // Saved row: delete from database
    this.publicationsService.deletePublication(
      this.reportId,
      publication.id
    ).subscribe({
      next: () => {
        this.publications.splice(index, 1);

        if (this.publications.length === 0) {
          this.publications.push(this.createRow());
        }

        this.successMessage = 'Publication deleted successfully.';
      },
      error: (err) => {
        console.error('Error deleting publication:', err);
        this.errorMessage = 'Unable to delete publication.';
      }
    });
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
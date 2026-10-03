

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConferenceAttended } from '../../interfaces/conference-attended';
import { ConferencesService } from '../../services/conferences.service';


@Component({
  selector: 'app-conferences',
   standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.css']
})
export class ConferencesComponent implements OnInit {

  // =========================
  // INPUT
  // =========================
   loading = false;
  errorMessage = '';
  successMessage = '';

  @Input() reportId!: number;
  @Input() canEdit: boolean = false;

  conferences: ConferenceAttended[] = [];


  constructor(
    private conferencesService: ConferencesService
  ) {}


  ngOnInit(): void {
    this.getConferences();
  }


  // =========================
  // GET CONFERENCES
  // =========================

  getConferences(): void {

    if (!this.reportId) {
      console.error(
        'Report ID is null. Cannot fetch conferences.'
      );
      return;
    }

    this.conferencesService
      .getConferences(this.reportId)
      .subscribe({

        next: (res) => {

          console.log(
            'Conferences data:',
            res
          );

          // Load database records
          this.conferences = [...res];
          console.log(
            'Conferences after loading:',
            this.conferences
          );

          // Add one empty row for new entry
          this.conferences.push(
            this.createEmptyConference()
          );
        },

        error: (error) => {

          console.error(
            'Error fetching conferences:',
            error
          );
        }
      });
  }


  // =========================
  // CREATE EMPTY ROW
  // =========================

  createEmptyConference(): ConferenceAttended {

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
  // SAVE / UPDATE ROW
  // =========================

  saveRow(index: number): void {
    if (!this.canEdit) {
      return;
    }

    const conference =
      this.conferences[index];

    if (!this.reportId) {

      alert(
        'Progress report has not been created yet.'
      );

      return;
    }


    // =========================
    // VALIDATE
    // =========================

    if (!this.isConferenceComplete(conference)) {

      alert(
        'Please fill all conference details before saving.'
      );

      return;
    }
    this.errorMessage = '';
    this.successMessage = '';

    // =================================================
    // EXISTING RECORD -> UPDATE
    // =================================================
     console.log('Conference ID:', conference.id);
    if (conference.id) {
      console.log(
        'Updating conference:',
        conference,
        'reportId:',
        this.reportId
      );

      this.conferencesService
        .updateConference(
          this.reportId,
          conference.id,
          conference
        )
        .subscribe({

          next: (updatedConference) => {

            console.log(
              'Conference updated successfully:',
              updatedConference
            );

            this.conferences[index] =
              updatedConference;
              this.successMessage = 'Conference updated successfully.';

            // Keep one blank row at the bottom
            this.ensureEmptyRow();
          },

          error: (error) => {

            console.error(
              'Error updating conference:',
              error
            );
this.errorMessage = 'Unable to save conference.';
            alert(
              'Unable to update conference.'
            );
          }
        });

      return;
    }


    // =================================================
    // NEW RECORD -> INSERT
    // =================================================

    this.conferencesService
      .saveConference(
        this.reportId,
        conference
      )
      .subscribe({

        next: (savedConference) => {

          console.log(
            'Conference saved successfully:',
            savedConference
          );

          // Replace temporary row with saved record
          this.conferences[index] =
            savedConference;

          // Add another empty row
          this.ensureEmptyRow();
        },

        error: (error) => {

          console.error(
            'Error saving conference:',
            error
          );

          this.errorMessage = 'Unable to save conference.';
          alert(
            'Unable to save conference.'
          );
        }
      });
  }


  // =========================
  // ENSURE EMPTY ROW
  // =========================

  ensureEmptyRow(): void {
     if (!this.canEdit) {
      return;
    }

    const last =
      this.conferences[
        this.conferences.length - 1
      ];

    // If last row is already empty, do nothing
    if (
      last &&
      !last.id &&
      !this.isConferenceComplete(last)
    ) {
      return;
    }

    this.conferences.push(
      this.createEmptyConference()
    );
  }


  // =========================
  // VALIDATION
  // =========================

  isConferenceComplete(
    conference: ConferenceAttended
  ): boolean {

    return !!(
      conference.authors?.trim() &&
      conference.title?.trim() &&
      conference.type?.trim() &&
      conference.level?.trim() &&
      conference.organizer?.trim() &&
      conference.place?.trim() &&
      conference.dates?.trim() &&
      conference.presentationType?.trim() &&
      conference.participation?.trim() &&
      conference.funding?.trim()
    );
  }


  // =========================
  // ADD ROW
  // =========================

  addRow(): void {
    if (!this.canEdit) {
      return;
    }
    this.conferences.push(
      this.createEmptyConference()
    );
  }


  // =========================
  // DELETE ROW
  // =========================

  deleteRow(index: number): void {
    if (!this.canEdit) {
      return;
    }
    const conference =
      this.conferences[index];


    // =========================
    // NEW / UNSAVED ROW
    // =========================

    if (!conference.id) {

      this.conferences.splice(index, 1);

      return;
    }


    // =========================
    // DATABASE RECORD
    // =========================

    if (!this.reportId) {

      console.error(
        'Report ID is null. Cannot delete conference.'
      );

      return;
    }

this.errorMessage = '';
    this.successMessage = '';
    this.conferencesService
      .deleteConference(
        conference.id,
        this.reportId
      )
      .subscribe({

        next: () => {

          console.log(
            'Conference deleted successfully'
          );

          this.conferences.splice(index, 1);
          this.successMessage = 'Conference deleted successfully.';

          this.ensureEmptyRow();
        },

        error: (error) => {

          console.error(
            'Error deleting conference:',
            error
          );

          alert(
            'Unable to delete conference.'
          );
        }
      });
  }
}
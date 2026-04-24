import { Component, OnInit } from '@angular/core';
import {  ScholarService } from '../../services/scholar.service';
import { Scholar } from '../../models/scholar';
import { FormsModule } from '@angular/forms';
// Angular Material imports
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';


@Component({
  standalone: true,
  imports: [MatTabsModule,CommonModule,
MatFormFieldModule,
MatInputModule,
MatButtonModule,
FormsModule],
  selector: 'app-scholar',
  templateUrl: './scholar.component.html'
})
export class ScholarComponent implements OnInit {

  scholars: Scholar[] = [];
   canEditAcademic = false;
   selectedTabIndex = 0;

  // pagination
  page = 0;
  size = 10;
  total = 0;

  keyword = '';

  form: Scholar = this.getEmptyForm();
  loading: boolean = false;

  constructor(private service: ScholarService,
    private authService: AuthService,
    private messageService: MessageService) {}

  ngOnInit(): void {
     this.canEditAcademic = this.authService.isAuthorizedForAcademic();
    this.load();
  }

  // =========================
  // 🔄 LOAD DATA
  // =========================
  load() {
    console.log('Loading scholars with keyword:', this.keyword, 'page:', this.page, 'size:', this.size);
    this.service.search1(
      this.keyword,
      undefined,
      undefined,
      this.page,
      this.size
    ).subscribe(res => {
      console.log('Received response:', res);
      this.scholars = res.content;
      console.log('Loaded scholars:', this.scholars);
      this.total = res.totalElements;
    });
  }
  clearSearch() {
  this.keyword = '';
  this.search();
}

  deleteScholar(id: number) {

  if (!confirm('Are you sure you want to delete this scholar?')) return;

  this.service.deleteScholar(id).subscribe({
    next: () => {
      alert('Scholar deleted successfully');
      this.messageService.showSuccess('Scholar deleted successfully');
      this.load();   // 🔥 refresh list
    },
    error: (err) => {
      console.error(err);
      this.messageService.showError(err.error.message ||'Failed to delete scholar');
      alert('Failed to delete scholar');
    }
  });
}

  // =========================
  // 🔍 SEARCH
  // =========================
  search() {
    this.page = 0;
    this.load();
  }

  // =========================
  // ✏️ EDIT
  // =========================
  // edit(s: Scholar) {
  //    // 👉 Switch to Basic tab
  
  //   this.form = {
  //     ...s,
  //     admissionDate: this.formatDate(s.admissionDate),
  //     dateOfBirth: this.formatDate(s.dateOfBirth),
  //     registrationdate: this.formatDate(s.registrationdate),
  //     dateJRF: this.formatDate(s.dateJRF),
  //     dateJRFexp: this.formatDate(s.dateJRFexp),
  //     dateextension: this.formatDate(s.dateextension)
  //   };

  // }

  // =========================
  // 💾 SAVE (CREATE/UPDATE)
  // =========================
  save() {

    if (this.form.id) {
      this.service.update(this.form.id, this.form)
        .subscribe(() => this.afterSave());
    } else {
      this.service.create(this.form)
        .subscribe(() => this.afterSave());
    }
  }

  afterSave() {
    this.resetForm();
    this.load();
  }

  // =========================
  // ❌ DELETE
  // =========================
  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }

  // =========================
  // 📄 PAGINATION
  // =========================
  next() {
    if ((this.page + 1) * this.size < this.total) {
      this.page++;
      this.load();
    }
  }

  prev() {
    if (this.page > 0) {
      this.page--;
      this.load();
    }
  }

  // =========================
  // 🧹 RESET FORM
  // =========================
  resetForm() {
    this.form = this.getEmptyForm();
  }

  getEmptyForm(): Scholar {
    return {
      id: 0,
      fullName: '',
      email: '',
      phone: '',
      fathername: '',
      address: '',
      admissionDate: '',
      dateOfBirth: '',
      registrationdate: '',
      dateJRF: '',
      dateJRFexp: '',
      dateextension: '',
      researchtopiceng: '',
      researchtopichnd: '',
      nameinhindi: '',
      dateSRF: '',
      datePhD: '',
      status: '', 
      enrolmentno: '',
      programName: '',
      programid: 0,
      gender_id: 0,
      appno: '',
      departmentName: '', 
      userId: 0,
      supervisorName: '',
      programname: '',
      supervisorId: 0,
      departmentId: 0
    };
  }

  // =========================
  // 📅 DATE FORMAT FIX
  // =========================
  formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  }
//   saveAcademic() {

//   if (!this.form.scholarId) {
//     alert('Please select a scholar first');
//     return;
//   }

//   this.service.updateAcademic(this.form.scholarId, this.form)
//     .subscribe({
//       next: () => {
//         alert('Academic details updated successfully');
//         this.load();        // reload table
//       },
//       error: (err) => {
//         console.error(err);
//         alert('Error updating academic details');
//       }
//     });
// }
saveBasic() {
  console.log('Saving basic details for scholar ID:', this.form.id);

  if (!this.form.id) return;  
   const confirmed = confirm('Are you sure you want to save Basic Info?');

  if (!confirmed) return;
  
  this.loading = true;

  this.service.update(this.form.id, this.form)
    .subscribe({
      next: () => {
        this.loading = false;
        console.log('Updated successfully');
        this.messageService.showSuccess('Basic details updated successfully');
        this.load();
      }, 
      error: () => {
        this.messageService.showError('Failed to update basic details');
        this.loading = false;
      } 
    });
} 
saveAcademic() {

  if (!this.form.id) return;

   const confirmed = confirm('Are you sure you want to save Academic Info?');

  if (!confirmed) return;

  this.loading = true;

  this.service.updateAcademic(this.form.id, this.form)
    .subscribe({
      next: () => {
        this.loading = false;
        console.log('Updated successfully');
        this.messageService.showSuccess('Academic details updated successfully');
        this.load();
      },
      error: () => {
        this.loading = false;
        this.messageService.showError('Failed to update academic details');

      }
    });
}
editScholar(s: any) {
this.selectedTabIndex = 1;
  this.form = {
    ...s,

    // ✅ Fix date fields for input[type="date"]
  
    admissionDate: this.formatDate(s.admissionDate),
    dob: this.formatDate(s.dob),
    registrationdate: this.formatDate(s.registrationdate),
    dateJRF: this.formatDate(s.dateJRF),
    dateJRFexp: this.formatDate(s.dateJRFexp),
    dateextension: this.formatDate(s.dateextension)
  };

}
}
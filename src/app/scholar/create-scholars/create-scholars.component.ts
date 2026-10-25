import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScholarService } from '../../services/scholar.service';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-create-scholars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-scholars.component.html'
})
export class CreateScholarsComponent {

  loading = false;
  message = '';
  errorMessage = '';
  // Add these properties inside your existing component class
xlsxUploading = false;
xlsxFile: File | null = null;
xlsxMessage = '';
xlsxError = '';
xlsxProgress = 0;

  constructor(private scholarService: ScholarService) {}

  createScholarsFromCMS(): void {

    if (this.loading) {
      return;
    }

    this.loading = true;
    this.message = '';
    this.errorMessage = '';

    this.scholarService.createScholarsFromCMS().subscribe({
      next: (response: string) => {
        this.message = response;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error.error || 'Failed to import scholars from CMS.';
        this.loading = false;
      }
    });
  }

  // Select and validate the Excel file
// onXlsxFileSelected(event: Event): void {
//   const input = event.target as HTMLInputElement;
//   const file = input.files?.[0];

//   this.xlsxFile = null;
//   this.xlsxMessage = '';
//   this.xlsxError = '';
//   this.xlsxProgress = 0;

//   if (!file) {
//     return;
//   }

//   if (!file.name.toLowerCase().endsWith('.xlsx')) {
//     this.xlsxError = 'Please select a valid .xlsx file.';
//     input.value = '';
//     return;
//   }

//   this.xlsxFile = file;
//   this.uploadXlsxFile(input);
// }


onXlsxFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  this.xlsxMessage = '';
  this.xlsxError = '';

  if (!file) {
    return;
  }

  if (!file.name.toLowerCase().endsWith('.xlsx')) {
    this.xlsxError = 'Please select a valid XLSX file.';
    input.value = '';
    return;
  }

  this.xlsxUploading = true;

  this.scholarService.uploadFile(file).subscribe({
    next: (event) => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total) {
          const progress = Math.round(
            (event.loaded / event.total) * 100
          );
          console.log('Upload progress:', progress + '%');
        }
      }

      if (event.type === HttpEventType.Response) {
        const response = event as HttpResponse<any>;

        this.xlsxMessage =
          typeof response.body === 'string'
            ? response.body
            : response.body?.message ||
              'Scholars uploaded successfully.';

        this.xlsxUploading = false;
        input.value = '';
      }
    },

    error: (err) => {
      this.xlsxError =
        err.error?.message ||
        'Failed to upload XLSX file.';

      this.xlsxUploading = false;
    }
  });
}




}
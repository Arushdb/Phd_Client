import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   

@Component({
  selector: 'app-scholar-documents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scholar-documents.component.html'
})
export class ScholarDocumentsComponent {

  /** progress_report.id */
  @Input() reportId!: number;

  /** scholar_id (from login context) */
  @Input() scholarId!: number;

  /** false when progress_status = APPROVED */
  @Input() editable = true;

  /** mock document_type_master */
  documentTypes = [
    { id: 1, label: 'Progress Report PDF' },
    { id: 2, label: 'Research Paper' },
    { id: 3, label: 'Methodology' },
    { id: 4, label: 'Conference Certificate' }
  ];

  selectedFile: File | null = null;
  selectedType: number | null = null;

  /** Replace with API response */
  documents = [
    {
      document_id: 118,
      name: 'Methodology.pdf',
      document_type: 'Methodology',
      uploaded_at: '2026-01-05'
    },
    {
      document_id: 119,
      name: 'ConferenceCertificate.pdf',
      document_type: 'Conference Certificate',
      uploaded_at: '2026-01-07'
    }
  ];

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  upload(): void {
    if (!this.selectedFile || !this.selectedType) {
      alert('Please select document type and file');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('scholar_id', this.scholarId.toString());
    formData.append('related_table', 'progress_report');
    formData.append('related_id', this.reportId.toString());
    formData.append('document_type_id', this.selectedType.toString());

    console.log('Uploading document', formData);

    // TODO:
    // POST /api/documents/upload (multipart/form-data)
    // → INSERT INTO documents
  }

  download(docId: number): void {
    console.log('Downloading document', docId);

    // TODO:
    // GET /api/documents/{docId}/download
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviewer-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviewer-documents.component.html'
})
export class ReviewerDocumentsComponent {

  /** progress_report.id */
  @Input() reportId!: number;

  /** Documents fetched using related_table + related_id */
  documents = [
    // Mock data – replace with API call
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

  download(docId: number): void {
    console.log('Reviewer downloading document', docId);

    // TODO:
    // GET /api/documents/{docId}/download
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../../services/document.service';
import { DocumentModel } from '../../models/document-model';

@Component({
  selector: 'app-reviewer-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviewer-documents.component.html'
})
export class ReviewerDocumentsComponent {

  /** progress_report.id */
  @Input() reportId!: number;
  @Input() scholarId!: number;

  constructor(private documentService: DocumentService) {

  }

  /** Documents fetched using related_table + related_id */
  documents:DocumentModel[] = [
    // Mock data – replace with API call
   
  ];

  download(docId: number): void {
    console.log('Reviewer downloading document', docId);
this.documentService.downloadDocument(docId).subscribe({
      next: (res) => {
        console.log('Document download response:', res);

         const url = window.URL.createObjectURL(res);
        const a = document.createElement('a');    
        a.href = url;
        a.download = `document_${docId}.pdf`; // You can set a better filename based on your data
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error downloading document:', err);
      }
    });
  }

  ngOnInit(): void {
    console.log('ReviewerDocumentsComponent initialized with reportId:', this.reportId,this.scholarId);    
  this.documentService.getProgressDocuments(this.reportId, this.scholarId).subscribe({
      next: (res) => {
        console.log('Documents fetched from API:', res);
        this.documents = res.data; // Assuming API response has a 'data' field with the documents array
     
     
     
     
      },
      error: (err) => {
        console.error('Error fetching documents:', err);
      }
    });   
  
  }

}

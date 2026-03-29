import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   
import { ScholarService } from '../../services/scholar.service';
import { MessageService } from '../../services/message.service';
import { DocumentModel, DocumentTypes } from '../../models/document-model';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-scholar-documents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scholar-documents.component.html'
})
export class ScholarDocumentsComponent implements OnInit {

  /** progress_report.id */
  @Input() reportId!: number | null;

  
  /** false when progress_status = APPROVED */
  @Input() editable = true;

  /** mock document_type_master */
  documentTypes : DocumentTypes[] = [
    // { id: 1, label: 'Progress Report PDF' },
    // { id: 2, label: 'Research Paper' },
    // { id: 3, label: 'Methodology' },
    // { id: 4, label: 'Conference Certificate' }
  ];

  selectedFile: File | null = null;
  selectedType: number | null = null;

  /** Replace with API response */
  documents:DocumentModel[] = [
    
  ];

  constructor(
    private documentservice: DocumentService,private messageService: MessageService
  ) { }

  ngOnInit(): void {
    console.log('ScholarDocumentsComponent initialized with reportId:', this.reportId);
    this.getDocumenttypes();
    this.loadDocuments();
     
  }

  ngOnChanges(changes: SimpleChanges) {
  if (changes['reportId']) {
    console.log("Received reportId:", this.reportId);
  }
}
  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  upload(): void {
    if (!this.selectedFile || !this.selectedType) {
      alert('Please select document type and file');
      return;
    }

     if (!this.reportId) {
    alert('Please save progress report before uploading documents.');
    return;
  }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    //formData.append('relatedId', this.reportId.toString() );
    formData.append('documentTypeId', this.selectedType.toString());
       
           const reportId =  this.reportId.toString() ;
    console.log('Uploading document', formData);


    this.documentservice.uploadProgressDocument(formData,reportId).subscribe({
      next: (res) => {
        this.messageService.showSuccess(res.message); 
        console.log('Document upload response:', res); 
        
         if (res.success) {
        alert("Document uploaded successfully");

        // 🔹 Refresh table
        this.loadDocuments();
      }
            
      },
      error: (err) => {
        this.messageService.showError(err.error?.message || 'Document upload failed');
      }
    });

    //    TODO:
    // POST /api/documents/upload (multipart/form-data)
    // → INSERT INTO documents
  }

  download(docId: number): void {
    console.log('Downloading document', docId);
       if (!docId) {
    return;   // stop if null
  }
  this.documentservice.downloadDocument(docId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');    
        a.href = url;
        a.download = `document_${docId}.pdf`; // You can set a better filename based on your data
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.messageService.showError(err.error?.message || 'Document download failed');
      }
    });     

    
    // TODO:
    // GET /api/documents/{docId}/download
  }
  

loadDocuments() {
    if (!this.reportId) {
    return;   // stop if null
  }
  this.documentservice.getProgressDocuments(this.reportId)
    .subscribe({
      next: (res:any) => {
        if (res.success) {
          this.documents = res.data;
          console.log('Loaded documents:', this.documents,res.data);
        }
      },
      error: (err:any) => {
        this.messageService.showError(err.error?.message || 'Failed to load documents');
      }
    });
}

getDocumenttypes() {
  this.documentservice.getDocumentTypes()
    .subscribe({
      next: (res:any) => {
        console.log('Document types response:', res);
        if (res.success) {
          this.documentTypes = res.data;
        }
      },
      error: (err:any) => {
        this.messageService.showError(err.error?.message || 'Failed to load document types');
      }
    });
}   
}
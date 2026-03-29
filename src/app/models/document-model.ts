export interface DocumentModel {
  documentId: number;
  name: string;
  documentTypeId: number;
  documentTypeName: string;
  uploadedAt: string;
  relatedtable: string;
  relatedId: number;
  
}


export interface DocumentTypes {
  id: number;
  name: string;
}
export interface Publication {

  id?: number;

  reportId?: number;
  

  authors: string;

  title: string;

  journal: string;

  volume?: string;

  pageNo?: string;

  year?: number;

  

  indexing?: string;
  impact?:string;

}
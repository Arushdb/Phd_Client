export interface ProgressReport {

  id: number;
  scholarId: number;
  semesterRegistrationId: number;
  lastSemesterRegistrationId?: number;

  attendence?: number;

  researchWork?: string;
  conference?: string;
  researchPaper?: string;
  tours?: string;

  summary?: string;
  nextActions?: string;

  

  progressStatus: 'DRAFT' | 'SUBMITTED' | 'REVIEWED' | 'REJECTED' | 'APPROVED';

  committeeState?: boolean;
  meetingDate?: string;
  
}

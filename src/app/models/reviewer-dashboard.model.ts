export interface ReviewerDashboardModel {
  scholarId: number;
  enrolmentno: string;
  scholarName: string;
  programName: string;
  session: string;
  reportId: number;
  status: string;
  submittedOn: string;
  scholarSemesterId: number; // Optional, needed for attendance
  semesterName: string; // Optional, needed for attendance
  totalsessions: number; // Optional, needed for attendance
  attendedsessions: number; // Optional, needed for attendance 
  attendancePercentage: number; // Optional, needed for attendance
  attendanceremarks: string; // Optional, needed for attendance

}
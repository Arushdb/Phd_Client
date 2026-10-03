export interface Achievement {
  id?: number;
  reportId?: number;
  awards: string;
  patents: string;
  teachingHours: number | null;
  teachingType: string;
}

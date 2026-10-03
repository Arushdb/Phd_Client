export interface ConferenceAttended {
  id?: number;
  reportId?: number;

  authors: string;
  title: string;
  type: string;
  level: string;
  organizer: string;
  place: string;
  dates: string;
  presentationType: string;
  participation: string;
  funding: string;
}

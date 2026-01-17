

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: any;
}

export interface ActiveSemester {
  semesterId: number;
  semester: string;
  scholarid: number;
 
}


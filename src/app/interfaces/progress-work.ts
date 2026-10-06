// export interface ProgressWork {
//   progressWorkId?: number;
//   stageOfResearch: string;
//   objectiveNo: string;
//   completionPercentage: number;
// }
export interface ProgressWork {
  id?: number;
  reportId?: number;
  stage: string;
  objectiveNo: string;
  completionPercentage: number | null;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
}

export interface Remark {
  remarkId: number;
  remarkText: string;
  role: string;
  parentRemarkId: number;
  remarkDate: string;
  reviewContext: string;
  contextId: number;
  isPrivate: boolean;
  replies: Remark[];
}
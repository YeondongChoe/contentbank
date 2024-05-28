import { QuizList } from './WorkbookType';

export interface Report {
  idx: number;
  quiz: QuizList;
  reportType: string;
  reportContent: string;
  reportBy: string;
  reportAt: string;
  answerType: string;
  answerContent: string;
  answerBy: string;
  answerAt: string;
  isUse: boolean;
}

export interface ReportData {
  reportList: Report[];
}

// export interface ReportData {
//   code: string;
//   timestamp: string;
//   data: Data;
// }

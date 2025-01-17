import { QuizList } from './WorkbookType';

export interface ReportType {
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
  articleList: {
    idx: number;
    originalName: string;
    storedPath: string;
    type: string;
  }[];
}

export interface ReportData {
  reportList: ReportType[];
}

// export interface ReportData {
//   code: string;
//   timestamp: string;
//   data: Data;
// }

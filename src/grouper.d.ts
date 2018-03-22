interface IStudent {
  id: string;
  name: string;
  imageUrl: string;
  gender?: string;
  level?: number;
  studentHistory?: IStudentHistory[];
}

interface IGrouperQuery {
  students: string[];
  group: IGroupParameters;
}

interface IGroupParameters {
  groupSize: number;
  effectOfHistory: number; // 0 - 1. 0 is random, 1 is based on historical data.
  isSameLevel: boolean;
}

interface IStudentHistory {
  group: number[];
  studentId: string;
}

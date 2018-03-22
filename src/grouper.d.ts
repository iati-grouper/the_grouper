interface IStudent {
  id: number;
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
  size: number;
}

interface IStudentHistory {
    group: number[];
    studentId: string;
}

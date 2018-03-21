interface IStudent {
  id: number;
  name: string;
  imageUrl: string;
}

interface IGrouperQuery {
  students: string[];
  group: IGroupParameters;
}

interface IGroupParameters {
  size: number;
}

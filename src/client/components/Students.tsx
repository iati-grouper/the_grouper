///<reference path="../../grouper.d.ts"/>
import * as React from 'react';
import { getStudents } from '../services/Network';

interface IStudentsState {
  isFetched: boolean;
  students: IStudent[];
}

export default class Students extends React.Component<{}, IStudentsState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isFetched: false,
      students: [],
    };
  }

  public componentWillMount() {
    getStudents()
      .then((data: any) => {
        console.log(data);
        this.setState({
          isFetched: true,
          students: data,
        });
      })
      .catch((err) => {
        console.warn(err);
        this.setState({
          isFetched: false,
        });
      });
  }

  public render() {
    return (
      <div>
        <h1>Students</h1>
        {
          this.state.isFetched
            ? this.state.students.map((s: IStudent) => {
              return <Student key={s.id} student={s}/>;
            })
            : <span>No data</span>
        }
      </div>
    );
  }
}

interface IStudentProps {
  student: IStudent;
}
export const Student: React.SFC<IStudentProps> = (props) => {
  const {student: {id, name}} = props;
  return (
    <div>{name}&nbsp;{id}</div>
  );
};

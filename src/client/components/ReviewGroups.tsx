import * as React from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {Student} from './Students';
import List, {ListItem} from "material-ui/List";
import Avatar from "material-ui/Avatar";

interface IReviewGroupsProps {
  students: IStudent[];
  queryResult?: string[][];
  query: IGrouperQuery;
}

export class ReviewGroups extends React.Component<IReviewGroupsProps, {}> {
  constructor(props: IReviewGroupsProps) {
    super(props);
  }

  public render() {
    const {students, query, queryResult} = this.props;
    const {group: {groupSize, isSameLevel, effectOfHistory}} = query;

    const getStudentList = (ids: string[]): JSX.Element => {
      return (
        <div>
          {
            ids.map((id: string) => {
              const student: IStudent | undefined = students.find((stu: IStudent) => stu.id.toString() === id);
              if (student) {
                return (
                  <ListItem key={student.id}
                            primaryText={student.name}
                            leftAvatar={<Avatar src={student.imageUrl}/>}
                  />
                );
              } else {
                return <span></span>;
              }
            })
          }
        </div>
      );
    };

    const showResults = (): JSX.Element => {
      return (
        <div className="groups-wrapper">
          {
            queryResult && queryResult.map((listOfIds: string[]) => {
              return (
                <div key={listOfIds.join('')} className="student-list-wrapper">
                  <Paper className="student-list">
                    <List>
                      {getStudentList(listOfIds)}
                    </List>
                  </Paper>
                </div>
              );
            })
          }
        </div>
      );
    };

    return (
      <Paper>
        <div className="review-page-wrapper">
          <h1 className="review-page-title">
            Success!
          </h1>
          <Subheader>Your Request was to divide {students.length} students into
            groups of {query.group.groupSize}.</Subheader>
        </div>
        <div>
          {showResults()}
        </div>
      </Paper>
    );
  }
}

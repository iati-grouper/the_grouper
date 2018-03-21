import * as React from 'react';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

export interface IFormProps {
  students: IStudent[];

  [index: string]: any;
}

export interface IFormState {
  selectedStudents: IStudent[];
  query: IGrouperQuery;
}

class GrouperForm extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);

    this.state = {
      query: {},
      selectedStudents: [],
    };
  }

  public render() {
    return (
      <div className="student-list-wrapper">
        <Paper className="student-list">
          <List>
            <Subheader>Students In Class</Subheader>
            {
              this.props.students.map((s: IStudent) => {
                return (
                  <ListItem key={s.id}
                            primaryText={s.name}
                            leftAvatar={<Avatar src={s.imageUrl}/>}
                  />
                );
              })
            }
          </List>
        </Paper>
      </div>
    );
  }
}

export {GrouperForm};

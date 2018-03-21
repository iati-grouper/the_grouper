/// <reference path="../../grouper.d.ts" />
import * as React from 'react';
import {Waiting} from './Waiting';
import {GrouperForm} from './GrouperForm';
import {getStudents} from '../services/Network';

export enum UserStoryMode {
  CREATING,
  WAITING,
  REVIEWING,
  UPDATING,
  DONE,
}

interface IAppProps {
  [index: string]: any;
}

interface IAppState {
  currentMode: UserStoryMode;
  students: IStudent[];
  query: IGrouperQuery;
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      currentMode: UserStoryMode.WAITING,
      query: {
        group: {
          size: 0,
        },
        students: [],
      },
      students: [],
    };
  }

  public componentWillMount() {
    getStudents()
      .then((result: IStudent[]) => {
        this.setState({
          currentMode: UserStoryMode.CREATING,
          students: result,
        });
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  public render() {
    const getApp: (m: UserStoryMode) => JSX.Element = (m: UserStoryMode) => {
      switch (m) {
        case UserStoryMode.CREATING: {
          return <GrouperForm students={this.state.students}/>;
        }
        // case UserStoryMode.REVIEWING: {
        //   return <ReviewGroups/>;
        // }
        // case UserStoryMode.DONE: {
        //   return <GrouperDone/>;
        // }
        default:
          return <Waiting/>;
      }
    };
    return getApp(this.state.currentMode);
  }
}

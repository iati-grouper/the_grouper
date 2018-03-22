/// <reference path="../../grouper.d.ts" />
import * as React from 'react';
import {Waiting} from './Waiting';
import {GrouperForm} from './GrouperForm';
import {getStudents, makeQuery} from '../services/Network';

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

interface IAppState extends IGroupParameters {
  currentMode: UserStoryMode;
  students: IStudent[];
  result?: any;
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      currentMode: UserStoryMode.WAITING,
      effectOfHistory: 0.5,
      groupSize: 2,
      students: [],
    };

    this.onGroupSizeChange = this.onGroupSizeChange.bind(this);
    this.onEffectOfHistoryChange = this.onEffectOfHistoryChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.convertStateToQuery = this.convertStateToQuery.bind(this);
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
          return <GrouperForm students={this.state.students}
                              effectOfHistory={this.state.effectOfHistory}
                              onEffectOfHistoryChange={this.onEffectOfHistoryChange}
                              onGroupSizeChange={this.onGroupSizeChange}
                              groupSize={this.state.groupSize}
                              onSubmit={this.onSubmit}/>;
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

  public onGroupSizeChange(size: number) {
    this.setState({
      groupSize: size,
    });
  }

  public onEffectOfHistoryChange(n: number) {
    this.setState({
      effectOfHistory: n,
    });
  }

  public onSubmit() {
    const queryObject: IGrouperQuery = this.convertStateToQuery();
    makeQuery(queryObject)
      .then((result: any) => {
        this.setState({
          currentMode: UserStoryMode.REVIEWING,
          result,
        });
      })
      .catch((err: any) => {
        this.setState({
          currentMode: UserStoryMode.CREATING,
        });
      });

    this.setState({
      currentMode: UserStoryMode.WAITING,
    });
  }

  private convertStateToQuery(): IGrouperQuery {
    const {students, groupSize, effectOfHistory} = this.state;
    const ids: string[] = students.map((s: IStudent) => s.id);
    const query: IGroupParameters = {
      effectOfHistory,
      groupSize,
    };

    return {
      group: query,
      students: ids,
    };
  }
}

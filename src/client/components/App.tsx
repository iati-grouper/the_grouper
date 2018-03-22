/// <reference path="../../grouper.d.ts" />
import * as React from 'react';
import {Waiting} from './Waiting';
import {GrouperForm} from './GrouperForm';
import {ReviewGroups} from './ReviewGroups';
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
  result?: string[][];
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      currentMode: UserStoryMode.WAITING,
      effectOfHistory: 0.5,
      groupSize: 2,
      isSameLevel: false,
      students: [],
    };

    this.onGroupSizeChange = this.onGroupSizeChange.bind(this);
    this.onEffectOfHistoryChange = this.onEffectOfHistoryChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.convertStateToQuery = this.convertStateToQuery.bind(this);
    this.onSameLevelChange = this.onSameLevelChange.bind(this);
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
    const getQuery = (): IGrouperQuery => {
      return {
        group: {
          effectOfHistory: this.state.effectOfHistory,
          groupSize: this.state.groupSize,
          isSameLevel: this.state.isSameLevel,
        },
        students: [],
      };
    };
    const getApp: (m: UserStoryMode) => JSX.Element = (m: UserStoryMode) => {
      switch (m) {
        case UserStoryMode.CREATING: {
          return <GrouperForm students={this.state.students}
                              effectOfHistory={this.state.effectOfHistory}
                              onEffectOfHistoryChange={this.onEffectOfHistoryChange}
                              isSameLevel={this.state.isSameLevel}
                              onSameLevelChange={this.onSameLevelChange}
                              onGroupSizeChange={this.onGroupSizeChange}
                              groupSize={this.state.groupSize}
                              onSubmit={this.onSubmit}/>;
        }
        case UserStoryMode.REVIEWING: {
          return <ReviewGroups students={this.state.students}
                               queryResult={this.state.result}
                               query={getQuery()}

          />;
        }
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

  public onSameLevelChange() {
    this.setState({
      isSameLevel: !this.state.isSameLevel,
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
    const {students, groupSize, effectOfHistory, isSameLevel} = this.state;
    const ids: string[] = students.map((s: IStudent) => s.id);
    const query: IGroupParameters = {
      effectOfHistory,
      groupSize,
      isSameLevel,
    };

    return {
      group: query,
      students: ids,
    };
  }
}

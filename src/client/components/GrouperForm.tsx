/// <reference path="../../grouper.d.ts" />
import * as React from 'react';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';

export interface IFormProps {
  effectOfHistory: number;
  groupSize: number;
  students: IStudent[];
  onSubmit: () => void;
  onGroupSizeChange: (x: number) => void;
  onEffectOfHistoryChange: (x: number) => void;
}

export interface IFormState {
}

class GrouperForm extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);

  }

  public render() {
    return (
      <div className="form-wrapper">
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
        <div className="form-section">
          <div className="form-inputs-wrapper">
            <Paper className="form-inputs">
              {
                groupSizeComponent({
                  groupSize: this.props.groupSize,
                  onGroupSizeChange: this.props.onGroupSizeChange,
                })
              }
              {
                effectOfHistoryComponent({
                  effectOfHistory: this.props.effectOfHistory,
                  onEffectOfHistoryChange: this.props.onEffectOfHistoryChange,
                })
              }
            </Paper>
          </div>
          <div className="submit-button-section">
            <RaisedButton onClick={this.props.onSubmit}>
              Submit
            </RaisedButton>
          </div>
        </div>
      </div>
    );
  }
}

type IGroupSizeProps = Pick<IFormProps, 'onGroupSizeChange' | 'groupSize'>;
const groupSizeComponent = (props: IGroupSizeProps) => {
  const getMenuItems = (n: number): JSX.Element[] => {
    const result: JSX.Element[] = [];
    for (let i = 2; i < n + 2; i++) {
      result.push(<MenuItem key={i} value={i} primaryText={`${i}`}/>);
    }
    return result;
  };
  return (
    <div className="group-size-wrapper">
      <Paper className="input-section">
        <Subheader>Size of Each Group</Subheader>
        <DropDownMenu value={props.groupSize}
                      onChange={(e: React.SyntheticEvent<HTMLElement>, index: number, value: number) => {
                        props.onGroupSizeChange(value);
                      }}>
          {getMenuItems(10)}
        </DropDownMenu>
      </Paper>
    </div>
  );
};

type IEffectOfHistoryProps = Pick<IFormProps, 'onEffectOfHistoryChange' | 'effectOfHistory'>;
const effectOfHistoryComponent = (props: IEffectOfHistoryProps) => {
  return (
    <div className="effect-of-history-wrapper">
      <Paper className="input-section">
        <Subheader>Effect Of Historical Groups</Subheader>
        <Subheader>0% is Random, 100% is Very Effective</Subheader>
        <Slider value={props.effectOfHistory}
                onChange={(e: any, value: number) => {
                  props.onEffectOfHistoryChange(value);
                }}/>
      </Paper>
    </div>
  );
};

export {GrouperForm};

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
import Toggle from "material-ui/Toggle";

export interface IFormProps {
  effectOfHistory: number;
  groupSize: number;
  isSameLevel: boolean;
  students: IStudent[];
  onSubmit: () => void;
  onSameLevelChange: () => void;
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
                effectOfHistoryComponent({
                  effectOfHistory: this.props.effectOfHistory,
                  onEffectOfHistoryChange: this.props.onEffectOfHistoryChange,
                })
              }
              {
                groupSizeComponent({
                  groupSize: this.props.groupSize,
                  onGroupSizeChange: this.props.onGroupSizeChange,
                })
              }
              {activityTypeComponent()}
              {
                homogeneousComponent({
                  isSameLevel: this.props.isSameLevel,
                  onSameLevelChange: this.props.onSameLevelChange,
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
    <div className="input-param-wrapper">
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

const activityTypeComponent = () => {
  return (
    <div className="input-param-wrapper">
      <Paper className="input-section">
        <Subheader>Type of Activity</Subheader>
        <DropDownMenu>
          <MenuItem primaryText="Fun"/>
          <MenuItem primaryText="Mathematics"/>
          <MenuItem primaryText="Social Sciences"/>
          <MenuItem primaryText="Sports"/>
          <MenuItem primaryText="English"/>
        </DropDownMenu>
      </Paper>
    </div>
  );
};

type IEffectOfHistoryProps = Pick<IFormProps, 'onEffectOfHistoryChange' | 'effectOfHistory'>;
const effectOfHistoryComponent = (props: IEffectOfHistoryProps) => {
  return (
    <div className="input-param-wrapper">
      <Paper className="input-section">
        <Subheader>Effect Of Historical Groups</Subheader>
        <Subheader>0% is Random, 100% is Very Effective</Subheader>
        <Slider value={props.effectOfHistory}
                style={{margin: 'auto', width: 200, padding: '10px 0'}}
                onChange={(e: any, value: number) => {
                  props.onEffectOfHistoryChange(value);
                }}/>
      </Paper>
    </div>
  );
};

type ISameLevelProps = Pick<IFormProps, 'onSameLevelChange' | 'isSameLevel'>;
const homogeneousComponent = (props: ISameLevelProps) => {
  return (
    <div className="input-param-wrapper">
      <Paper className="input-section">
        <Toggle style={{margin: 'auto', padding: '10px 0', width: 'inherit'}}
                defaultToggled={false}
                label="Similar Levels"
                onToggle={(e: any) => props.onSameLevelChange()}/>
      </Paper>
    </div>
  );
};

export {GrouperForm};

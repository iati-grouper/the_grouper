import * as React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export const Waiting: React.StatelessComponent = () => {
  return (
    <div className="waiting-wrapper">
      <CircularProgress size={80} thickness={7}/>
    </div>
  );
};

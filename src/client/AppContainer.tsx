import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import App from './components/App';

export default class AppContainer extends React.Component<{}, {}> {
  public render() {
    const getTitle = (): JSX.Element => {
      return (
        <div className="nav-title-wrapper">
          <img src="/assets/hackathon_logo.png" height="35" width="35"/>
          <span className="nav-title">Smart Grouper</span>
        </div>
      );
    };
    return (
      <MuiThemeProvider>
        <div id="main-wrapper">
          <AppBar title={getTitle()}/>
          <App/>
        </div>
      </MuiThemeProvider>
    );
  }
}

import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import App from './components/App';

export default class AppContainer extends React.Component<{}, {}> {
  public render() {
    return (
      <MuiThemeProvider>
        <div id="main-wrapper">
          <AppBar title="Grouper"/>
          <App />
        </div>
      </MuiThemeProvider>
    );
  }
}

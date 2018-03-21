import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';

import { Hello } from './Hello/Hello';

ReactDOM.render(
  <Hello compiler="TypeScript" framework="React" />,
  document.getElementById('target'),
);

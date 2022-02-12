import '@fontsource/barlow';
import 'modern-css-reset';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '../style/index.less';
import { App } from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.BASE_PATH ?? '/'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

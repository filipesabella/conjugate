import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../../style/App.less';
import { Main } from './Main';

export const App = () => {
  return <div id="app">
    <Switch>
      <Route path={['/', '/index.html']} exact={true} component={Main} />
    </Switch>
  </div>;
};

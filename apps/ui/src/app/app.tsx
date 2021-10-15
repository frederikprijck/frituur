import { Snacks } from './snacks';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AddSnack } from './add-snack';
import { EditSnack } from './edit-snack';

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/add">
          <AddSnack />
        </Route>
        <Route path="/:id">
          <EditSnack />
        </Route>
        <Route path="/">
          <Snacks />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

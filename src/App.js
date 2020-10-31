import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import './App.css';
import View from './components/View';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <View exact path="/"/>
            <View exact path="/:id/:id/:id" />
            </Switch>
            </BrowserRouter>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import LoginForm from './components/loginForm';
import Menu from './components/responsiveBar';

class App extends Component{
  render()
  {
    return (
      <div className="App">
       <Router>
        <Route path="/" exact component={() => <LoginForm auth={this.handleAuth}/>} />
        <Route path="/main" exact component={() => <Menu />} />
       </Router>
      </div>
    );
  }
}

export default App;


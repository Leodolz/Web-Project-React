import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import LoginForm from './components/loginForm';
import Home from './components/HomePage';
import UserSettings from './components/Settings';

class App extends Component{

  
render()
  {
    return (
      <div className="App">
       <Router>
        <Route path="/" exact component={() => <LoginForm auth={this.handleAuth}/>} />
        <Route path="/home"  exact component={()=> <Home/>}/>
        <Route path="/settings"  exact component={()=> <UserSettings/>}/>
       </Router>
      </div>
    );
  }
}

export default App;


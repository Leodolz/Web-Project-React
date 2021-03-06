import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import LoginForm from './components/loginForm';
import Home from './components/HomePage';
import UserSettings from './components/Settings';
import ExamEdit from './components/controllers/AddEditExam';
import AddEditStudents from './components/controllers/AddEditStudents';
import AddEditAreas from './components/controllers/AddEditAreas';
import AddEditSubAreas from './components/controllers/AddEditSubAreas';
import ViewExam from './components/controllers/ViewExam'
import TakeExam from './components/controllers/TakeExam'
import AddEditQuestions from './components/controllers/AddEditQuestions'
class App extends Component{

  
render()
  {
    return (
      <div className="App">
       <Router>
        <Route path="/" exact component={() => <LoginForm auth={this.handleAuth}/>} />
        <Route path="/home"  exact component={()=> <Home/>}/>
        <Route path="/settings"  exact component={()=> <UserSettings/>}/>
        <Route path="/admExam"  exact component={()=> <ExamEdit/>}/>  
        <Route path="/admStudent"  exact component={()=> <AddEditStudents/>}/>  
        <Route path="/admAreas"  exact component={()=> <AddEditAreas/>}/>
        <Route path="/admSubAreas"  exact component={()=> <AddEditSubAreas/>}/>  
        <Route path="/studentExm"  exact component={()=> <ViewExam/>}/>  
        <Route path="/ExamStudent"  exact component={()=> <TakeExam/>}/>  
        <Route path="/admSubAreaQuestions"  exact component={()=> <AddEditQuestions />}/>  
       </Router>
      </div>
    );
  }
}

export default App;


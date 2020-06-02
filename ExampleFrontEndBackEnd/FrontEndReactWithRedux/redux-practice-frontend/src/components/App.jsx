import React, { Component } from 'react';
import '../App.css';
import UserGetter from './small_components/UserGetter';
import UserPoster from './small_components/UserPoster';
import TodoList from './small_components/TodoList';

class App extends Component{

state = {}
    render() {
        return (
        <>
          <UserGetter />
          <br/>
          <UserPoster />
          <TodoList/>
        </>
    );
    }
}

export default App;

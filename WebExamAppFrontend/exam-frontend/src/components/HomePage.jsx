import React, { Component } from 'react';
import MainPage from './controllers/UserController';
import AdminHome from './adminUIs/AdminHome'
import StudentHome from './studentUIs/StudentHome'

class Home extends Component {
    state=
    {
        user:null,
    }
    render() {
        let body = null;
        let role = '';
        if(this.state.user)
        {
            console.log(this.state.user);
            role= this.state.user.role;
            body = this.state.user.role === "Admin"? 
            <AdminHome user={this.state.user} />:<StudentHome user={this.state.user}/>; 
        }

        return (
            <React.Fragment>
            <MainPage 
             GetGenAccFunction =  {this.GetGenAccFunc}
             role={role} 
             body={body} 
             home="active" 
             GetUser={this.GetUser}/>
            </React.Fragment>
          );
    }
    GetUser = (user) =>
    {
        this.setState({user:user});
    }

}

/*Nested accordion example
body:
    {
    before: <p>EverySubArea <button>Edit</button></p>,
    title:("SubSubAreas"),
    body:(<p>This is a super nested area</p>),
    after:(<button>Add SubArea</button>)
    }
*/
 
export default Home;
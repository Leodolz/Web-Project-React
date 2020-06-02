import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addTodo,deleteTodo} from '../../redux/actions';

class TodoList extends Component {
    state = 
    {
        addTodoInput: '',
    }

    handleSubmitAdd = (event) =>
    {
        let input = event.target.addTodo.value;
        event.preventDefault()
        if (!input.trim()) {
            return
        }
        this.props.addTodo(input)
        this.refs.inputAdd.value = '';
    }

    render() { 
        const {todos, deleteTodo} = this.props;
        return (
            <div className="container">
                <h3>Todos:</h3>
                <form
                onSubmit={this.handleSubmitAdd}
                >
                    <input placeholder="New Todo" type="text" name="addTodo" ref="inputAdd"/>
                    <button type="submit">Add Todo</button>
                </form>
                <ul>
                    {todos.map(todo=>
                        <li id={todo.id} key={"todo"+todo.id}>{todo.text}
                        <button className="delete" onClick={()=>deleteTodo(todo.id)}>X</button></li>
                    )}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return{
        todos: state.todos,
    };
}

const mapDispatchToProps = dispatch=>
({
    deleteTodo: id=> dispatch(deleteTodo(id)),
    addTodo: id => dispatch(addTodo(id))
})
 
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
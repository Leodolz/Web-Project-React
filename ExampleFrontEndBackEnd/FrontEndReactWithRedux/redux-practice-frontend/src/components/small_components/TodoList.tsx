import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addTodo,deleteTodo} from '../../redux/actions';

interface IFromProps{
    addTodo: Function;
    todos: Array<Itodo<string>>;
    deleteTodo: Function;
}

interface Itodo<T extends string|number>{
    readonly id: number;
    text: T;
}

class TodoList extends Component<IFromProps> {
    state = 
    {
        addTodoInput: '',
    }
    refs:{
        [string:string]:any;
        inputAdd: {value: string};
    }

    handleSubmitAdd = (event: React.FormEvent<HTMLFormElement>) =>
    {
        let input = this.refs.inputAdd.value;
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
                    <input placeholder="New Todo" type="text" ref="inputAdd"/>
                    <button type="submit">Add Todo</button>
                </form>
                <ul>
                    {todos.map(todo=>
                        <li id={""+todo.id} key={"todo"+todo.id}>{todo.text}
                        <button className="delete" onClick={()=>deleteTodo(todo.id)}>X</button></li>
                    )}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state: { todos: Readonly<Array<Itodo<string>>>; })
{
    return{
        todos: state.todos,
    };
}

const mapDispatchToProps = (dispatch)=>
({
    deleteTodo: (id: number)=> dispatch(deleteTodo(id)),
    addTodo: (id:number) => dispatch(addTodo(id))
})
 
export default connect(mapStateToProps, mapDispatchToProps)(TodoList); 
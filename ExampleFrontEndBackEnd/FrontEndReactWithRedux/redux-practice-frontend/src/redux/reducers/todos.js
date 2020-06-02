import {ADD_TODO, DELETE_TODO, FOUND_BAD_WORD} from '../constants'

const todos = (state= [], action) =>
{
    switch(action.type)
    {
        case ADD_TODO:
            return [...state, {
                id: action.id,
                text: action.text
            }]
        case DELETE_TODO:
            return [...state].filter(todo=>todo.id != action.id);
        case FOUND_BAD_WORD:
            alert("Found bad word!");
        default: 
            return state;
    }
}
export default todos;
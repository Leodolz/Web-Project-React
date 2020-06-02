import {GET_USER,GET_ARRAY, POST_OBJECT, ADD_TODO, DELETE_TODO} from './constants'

var id = 0;

export const getData = (arg, funcArg) =>
({
    type: GET_USER,
    argument: arg,
    funcArg
});

export const getArray = (arg, funcArg) =>
({
    type: GET_ARRAY,
    argument: arg,
    funcArg
});

export const postObject = (arg, objectArg) =>
({
    type: POST_OBJECT,
    arg,
    objectArg
});

export const addTodo = (text) =>
({
    type: ADD_TODO,
    id: id++,
    text
});

export const deleteTodo = (id) =>
({
    type: DELETE_TODO,
    id
});

import {combineReducers} from 'redux';
import consulter from './consulter';
import poster from './poster';
import todos from './todos';
export default combineReducers({
    consulter,
    poster,
    todos
});
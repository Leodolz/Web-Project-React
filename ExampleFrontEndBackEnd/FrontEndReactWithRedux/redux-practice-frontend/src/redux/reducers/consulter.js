import {SINGLE_DATA_LOADED, API_ERRORED, PLURAL_DATA_LOADED} from '../constants';

const consulter = (state= [], action) =>
{
    switch(action.type)
    {
        case SINGLE_DATA_LOADED:
            return action.payload;
        case API_ERRORED:
            return state.concat(action.payload);
        case PLURAL_DATA_LOADED:
            return [action.payload];
        default:
            return state;
    }
}
export default consulter;
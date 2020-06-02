import {POST_FINISHED, API_ERRORED} from '../constants'

const poster = (state = false, action) =>
{
    switch(action.type)
    {
        case POST_FINISHED:
            return true;
        case API_ERRORED:
            return false;
        default:
            return state;
    }
}

export default poster;
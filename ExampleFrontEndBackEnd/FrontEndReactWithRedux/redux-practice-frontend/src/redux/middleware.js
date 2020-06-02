import {ADD_TODO, FOUND_BAD_WORD} from './constants'

const forbiddenWords = ["spam","money","scam"];


export function filterWordsMiddleware({dispatch})
{
    return function(next)
    {
        return function(action)
        {
            if(action.type === ADD_TODO)
            {
                const foundWord = forbiddenWords.filter(word=> 
                    action.text.includes(word));
                if(foundWord.length)
                    return dispatch({type: FOUND_BAD_WORD})
            }
            return next(action);
        }
    }
}
import {takeEvery, call, put} from 'redux-saga/effects'
import {GET_USER, SINGLE_DATA_LOADED, 
    API_ERRORED, PLURAL_DATA_LOADED, 
    GET_ARRAY, POST_FINISHED, POST_OBJECT,
    API_ADRESS} from '../constants'
export default function* watcherSaga() {
    yield takeEvery(GET_USER, getObjectDispatcher);
    yield takeEvery(GET_ARRAY, getArrayDispatcher);
    yield takeEvery(POST_OBJECT, postObjectDispatcher);
}

function* getObjectDispatcher(action) {
    try
    {
        const payload = yield call(()=>getData(action.argument, action.funcArg));
        yield put({type: SINGLE_DATA_LOADED, payload});
    }
    catch(e) 
    {
        yield put({type: API_ERRORED, e});
    }
}

function* getArrayDispatcher(action) {
    try
    {
        const payload = yield call(()=>getData(action.argument, action.funcArg));
        yield put({type: PLURAL_DATA_LOADED, payload});
    }
    catch(e) 
    {
        yield put({type: API_ERRORED, e});
    }
}

function* postObjectDispatcher(action) {
    try
    {
        const payload = yield call(()=>postObject(action.arg, action.objectArg));
        yield put({type: POST_FINISHED, payload});
    }
    catch(e) 
    {
        yield put({type: API_ERRORED, e});
    }
}

function getData(argument, funcArg) 
{
    return fetch(API_ADRESS+argument)
    .then(response => response.json()
    .then((data)=> funcArg(data)));
}

function postObject(argument, objectArg)
{
    fetch(API_ADRESS+argument,
      {
          method: 'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(objectArg)
      })
      .catch(e=>alert(e));
    alert("Registered new student");
}
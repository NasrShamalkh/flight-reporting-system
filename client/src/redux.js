import { createStore } from 'redux';
//our action types
const SET_DATA = 'SET_DATA';
const SET_INDEX = 'SET_INDEX';

//our actions
export const setData = data => {
  return {
    type: SET_DATA,
    payload: {
      data: data
    }
  };
};

export const setIndex = index => {
  return {
    type: SET_INDEX,
    payload: {
      data: index
    }
  };
};

// initial state
const initState = {
  report_data: [],
  record_index: 0
};

//our reducer

const reducer = function(state = initState, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        report_data: action.payload.data
      };
    case SET_INDEX:
      return {
        ...state,
        record_index: action.payload.data
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;

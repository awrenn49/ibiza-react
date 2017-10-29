import _ from 'underscore';

import { ADD_COUNT } from '../actions/merchandise/merchandise_action';

const update = (state, mutations) => {
  Object.assign({}, state, mutations)
  return state;
}

export default function(state = {}, action) {

  switch (action.type) {
    case ADD_COUNT:
      state = update(state, {value: state.value + 1})
      return state ;
  }
  return state;
}
import _ from 'underscore';

import { ADD_COUNT, ADD_MERCHANDISE, GET_MERCHANDISE } from '../actions/merchandise/merchandise_action';

const initialMerchandiseState = {
  merchandiseCount: 0,
  merchandiseCart: [],
  merchandiseItems: {}
}

export default function(state = initialMerchandiseState, action) {
  console.log("merchandise state", state)
  switch (action.type) {
    case ADD_COUNT:
      return{
        ...state,  
        merchandiseCount: state.merchandiseCount + 1 
      }
  }
  switch (action.type) {
    case ADD_MERCHANDISE:
      console.log("action payload", action.payload)
      return  {
        ...state,
        merchandiseCart: [...state.merchandiseCart, action.payload]
      }
  }
  switch (action.type) {
    case GET_MERCHANDISE:
      return {
        ...state,
        merchandiseItems: action.payload
      }
  }
  return state;
}
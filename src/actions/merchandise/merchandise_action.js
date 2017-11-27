import firebase from '../firebase';
var firestore2 = require('firebase/firestore');

export const ADD_COUNT = 'add_count';
export const ADD_MERCHANDISE = 'add_merchandise';
export const GET_MERCHANDISE = 'get_merchandise';

const firestore = firebase.firestore();

export function addCount() {
  return  {
    type : ADD_COUNT
  }
}

export function addMerchandise(merchandiseItem) {
  console.log("add merchandise hit", merchandiseItem)
  return {
    type : ADD_MERCHANDISE,
    payload : merchandiseItem
  }
}


export function getMerchandise(club) {
  const Merchandise = club ? firestore.collection('merchandise').where("club","==",club) : firestore.collection('merchandise'); 
  return dispatch => {
    Merchandise.get().then(querySnapshot => {
      var data = querySnapshot.docs.map(function (documentSnapshot) {
        return documentSnapshot.data();
      });
      dispatch({
        type: GET_MERCHANDISE,
        payload: data
      })
    })
  }

}
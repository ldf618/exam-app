const initialState = {
    isLoading: false,
    items: [],
    hasError: false
 };

 const action = {
    type: 'ITEMS_REQUEST', //action type
    isLoading: true //payload information
 }

const reducer = (state = initialState, action) => { //es6 arrow function
    switch (action.type) {
       case 'ITEMS_REQUEST':
          return Object.assign({}, state, {
             isLoading: action.isLoading
          })
       default:
          return state;
    }
 }
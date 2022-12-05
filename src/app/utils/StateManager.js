//import {useClearState, useSaveUserState, useLoadState} from './UserState';

export default class StateManager {

    static loadState(item) {
        try {
            let serializedState = sessionStorage.getItem(item);

            if (serializedState === null) {
                return this.initializeState(item);
            }

            return JSON.parse(serializedState);
        }
        catch (err) {
            return this.initializeState(item);
        }
    }

    static saveState(item, state) {
        try {
            let serializedState = JSON.stringify(state);
            sessionStorage.setItem(item, serializedState);
  /*          if (item==='localUser'){
                useSaveUserState(state);
            }*/
        }
        catch (err) {
        }
    }

    static initializeState(item) {
        //return {id: 2, firstname: "Joaquim", surname1: "Arranz", surname2: "Campo", dni: "99999999B",…}
        //return {id:null, firstname:null, surname1:null, surname2:null, dni:null ,type: null, username:null}
        return null;
    };    

    static removeState (item){
        sessionStorage.removeItem(item);
    }

    static removeState (){
        sessionStorage.clear();
    }
}
/*
and then when bootstrapping your app...

import StateLoader from "./state.loader"

const stateLoader = new StateLoader();

let store = createStore(appReducers, stateLoader.loadState());

store.subscribe(() => {
    stateLoader.saveState(store.getState());
});
*/
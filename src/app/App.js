import React, {useEffect} from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import HeaderUserInfo from './menu/HeaderUserInfo';
import MainMenu from './menu/MainMenu';
import StateManager from './utils/StateManager';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './assets/css/fonts.css';
import './App.css'


function App() {
  let navigate = useNavigate();
  var localUser = StateManager.loadState('localUser');
  //esto se ejecuta despues de cargar la pagina
  useEffect(() => {
    localUser = StateManager.loadState('localUser');
    console.log(localUser);
  if (localUser==null)
      navigate("/")   
   },[localUser])


  return (
    <div className="m-3">
      {localUser&&
      <>
        <MainMenu userClass={localUser.type}/>
        <HeaderUserInfo user={localUser}/>
      <br/>
      <Outlet/>
      </>
      }
      
    </div>
  );
}

export default App;

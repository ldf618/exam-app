
import React, {useEffect} from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import HeaderUserInfo from './components/HeaderUserInfo';
import MainMenu from './components/MainMenu';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  
  let navigate = useNavigate();
  var localUser = sessionStorage.getItem('localUser');
  var user;

  //esto se ejecuta despues de cargar la pagina
  useEffect(() => {
    if (localUser===undefined)
      navigate("/")   
   },[localUser])

  
  if (localUser!==undefined){
    user=JSON.parse(localUser);
  } 

  return (
    <div className="m-3">
      {(localUser!==undefined)&&
      <>
        <MainMenu userClass={user.userClass}/>
        <HeaderUserInfo user={user}/>
      </>
      }
      <br/>
      <Outlet/>

    </div>
  );
}

export default App;

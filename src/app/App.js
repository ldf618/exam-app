
import React, {useEffect} from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import HeaderUserInfo from './components/HeaderUserInfo';
import MainMenu from './components/MainMenu';
import TimeoutAlert from './components/TimeoutAlert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert  } from 'react-bootstrap';


function App() {
  
  let navigate = useNavigate();
  var localUser = sessionStorage.getItem('localUser');
  var user;

  //esto se ejecuta despues de cargar la pagina
  useEffect(() => {
    if (localUser==undefined)
      navigate("/")   
   },[localUser])

  
  if (localUser!=undefined){
    user=JSON.parse(localUser);
  } 

  return (
    <div className="m-3">
      {(localUser!=undefined)&&
      <>
        <MainMenu userClass={user.userClass}/>
        <HeaderUserInfo user={user}/>
      </>
      }
      <br/>
      <Outlet/>
      <TimeoutAlert show={true} timeout={5000} variant='danger'>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </TimeoutAlert>
    </div>
  );
}

export default App;

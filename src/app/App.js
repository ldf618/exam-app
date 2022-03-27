import './App.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    <div className="App">
      {(localUser!=undefined)&&
        <Header user={user}/>
      }
    </div>
  );
}

function Header(props){
  let navigate = useNavigate();
  const user = props.user;
  var colspan = user.userClass === "Student" ? 3 : 0;
  const courseName = "Asignatura 1";


  return (
  
    <table width="100%" border="1" className="reference">
    <tbody>
      <tr>
        <td width="47%">
          <br />
          <p className="title">Informes de trabajo en grupo</p>
          <p align="center" className="negrita">{courseName}</p>
        </td>
        <td width="44%">
          <table width="100%" border="1" className="reference">
            <tbody>
              <tr>
                <td width="26%" className="cabeceraPeq1">Usuario:</td>
                <td width="74%" className="cabeceraPeq2" colSpan={colspan}>
                  {user.firstName + " " + user.surname1 + " " + user.surname2}
                </td>
              </tr>
              <tr>
                <td className="cabeceraPeq1">Perfil:</td>
                <td className="cabeceraPeq2" colSpan={colspan}>
                  {user.userClass}
                </td>
              </tr>
              <tr>
                <td className="cabeceraPeq1">Aula:</td>
                <td className="cabeceraPeq2">{user.classroom.name}</td>
                {user.userClass === "Student" &&
                  <>
                    <td className="cabeceraPeq1">Grupo:</td>
                    <td className="cabeceraPeq2">{user.group.name}</td>
                  </>
                }
              </tr>
            </tbody>
          </table>
        </td>
        <td width="9%">
          <button className="button" type="logout" onClick={() => { navigate("/")}}>
            <div className="divinline">
             Logout
            <svg  viewBox="0 0 448 512"><path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"/></svg>
            </div>
          </button>        
        </td>
      </tr>
    </tbody>
  </table>
  );
}

export default App;

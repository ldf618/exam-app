import './App.css';
import { Link } from "react-router-dom";
import { getUser } from "./data";

function App() {
  var user = getUser("12345678W");

  return (
    <div className="App">
      <Header user={user}/>
    </div>
  );
}

function Header(props){

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
          <nav>
            <Link to="/logout">Desconectar</Link>
          </nav>
        </td>
      </tr>
    </tbody>
  </table>
  );
}

export default App;

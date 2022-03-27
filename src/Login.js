import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { authenticate } from "./app/data";


export default function Login() {
    let navigate = useNavigate();
    const [userName, setUserName] = useState("Usuario");
    const [userPass, setUserPass] = useState("Clave");

    function submit (event) {
        event.preventDefault();        
        //alert('A user and password were submitted: '+userName+" "+userPass);
        var authUser = authenticate(userName,userPass);
        if (authUser===undefined)
            alert ("No existe el usuario o la clave es incorrecta");
        else{
            sessionStorage.setItem('localUser',JSON.stringify(authUser));
            navigate("/app");
        }

      }
      

    return (
        <div className="fondo">
            <form type="submit" /*method="post"*/ onSubmit={submit}>
                <h1 align="center" className="title">Autenticaci&oacute;n</h1>
                <h2 align="center" className="title">Informes de Trabajo en Grupo</h2>
                <br/>
                <br/>            
                <label>
                    Usuario:
                    <input name="user" value ={userName} onChange={event => setUserName(event.target.value)}/>
                </label>
                <br/>
                <br/>
                <label>
                    Clave:
                    <input  type="password" name="password" value ={userPass} onChange={event => setUserPass(event.target.value)} />
                </label>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>            
                <button className="button" type="submit" value="submit">
                    Login
                </button>
            </form>
        </div>      
    );
  }
  
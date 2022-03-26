import {useNavigate} from "react-router-dom";
import { useState } from "react";

export default function Pagina() {
    let navigate = useNavigate();
    const [userName, setUserName] = useState("Usuario");
    const [userPass, setUserPass] = useState("Clave");
    return (
        <div className="fondo">
            <h1 align="center" className="title">Autenticaci&oacute;n</h1>
            <h2 align="center" className="title">Informes de Trabajo en Grupo</h2>
            <br/>
            <br/>            
            <label>Usuario:<input value ={userName} onChange={event => setUserName(event.target.value)}/></label>
            <br/>
            <br/>
            <label>Clave:<input  type="password" name="password" value ={userPass} onChange={event => setUserPass(event.target.value)} /></label>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>            
            <button className="button" type="submit" onClick={() => { navigate("/")}}>
                Login
            </button>
        </div>      
    );
  }
  
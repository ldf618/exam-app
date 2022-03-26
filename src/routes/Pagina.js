import {useNavigate} from "react-router-dom";

export default function Pagina() {
    let navigate = useNavigate();
    return (
        <div className="fondo">
            <h1 align="center">&nbsp;</h1>
            <h1 align="center" className="title">Informes de Trabajo en Grupo. Autenticaci&oacute;n</h1>
            <label>Usuario:<input value ="usuario" name="tfNombreUsuario"/></label>
            <label>Clave:<input value ="clave" name="tfClave" /></label>
            <p></p>
            <button className="button" type="submit" onClick={() => { navigate("/")}}>
                Login
            </button>
        </div>
    );
  }
  
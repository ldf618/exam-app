import { Table } from 'react-bootstrap';
import StateManager from '../utils/StateManager';

function HeaderUserInfo(props) {
    const user = props.user;
    const degree = StateManager.loadState('degree');
    var course = StateManager.loadState('course')??{ "id": 0, "name": "" };
    var classroom = StateManager.loadState('classroom')??{ "id": 0, "name": "" };
    var group = StateManager.loadState('group')??{ "id": 0, "name": "" };

    return (
        <Table bordered size="sm">
            <tbody >
                <tr>
                    <td className="fw-bold" width="10%">Usuario:</td>
                    <td width="40%">
                        {user.firstname + " " + user.surname1 + " " + user.surname2}
                    </td>
                    <td className="fw-bold" width="10%">Perfil:</td>
                    <td width="40%">
                        {user.type}
                    </td>
                </tr>
                {classroom !== 'undefined' && classroom !== null &&
                    <tr>
                        <td className="fw-bold" width="10%">Aula:</td>
                        <td >{classroom.name}</td>
                        {user.type === "Student" &&
                            <>
                                <td className="fw-bold" width="10%">Grupo:</td>
                                <td >{group.name}</td>
                            </>
                        }
                        {user.type === "Consultant" &&
                            <>
                                <td ></td>
                                <td ></td>
                            </>
                        }
                    </tr>
                }
                {course !== 'undefined' && course !== null &&
                    <tr>
                        <td className="fw-bold" width="10%">Titulacion:</td>
                        <td >
                            {degree}
                        </td>
                        <td className="fw-bold" width="10%">Asignatura:</td>
                        <td >
                            {course.name}
                        </td>
                    </tr>
                }
            </tbody>
        </Table>
    );
}

export default HeaderUserInfo;
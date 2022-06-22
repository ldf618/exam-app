import { Table } from 'react-bootstrap';

function HeaderUserInfo(props) {
    console.log("headeruserinfo")
    const user = props.user;
    //const colspan = user.userClass === "Student" ? 3 : 0;
    const degree = sessionStorage.getItem('degree');
    const course = sessionStorage.getItem('course');
    var sessionClassroom = sessionStorage.getItem('classroom');
    var sessionGroup = sessionStorage.getItem('group');
    var classroom = sessionClassroom !== 'undefined' ? JSON.parse(sessionClassroom) : { "id": 0, "name": "" }
    var group = sessionGroup !== 'undefined' ? JSON.parse(sessionGroup) : { "id": 0, "name": "" }
        //    console.log(user);

    return (
        /*
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header ><div className="mx-auto fw-bold">Informes de Trabajo en Grupo</div></Accordion.Header>
                <Accordion.Body className="p-2">
    */
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
                                <td >{/*group.name*/}</td>
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
                            {course}
                        </td>
                    </tr>
                }
            </tbody>
        </Table>
        /*
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
        */
    );
}

export default HeaderUserInfo;
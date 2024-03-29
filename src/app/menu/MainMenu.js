import { Navbar, Nav } from 'react-bootstrap';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import ConsultantMenu from './ConsultantMenu';
import StudentMenu from './StudentMenu';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../slices/counterSlice';
import StateManager from '../utils/StateManager';

function MainMenu(props) {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    const userClass = props.userClass;
    const navigate = useNavigate();
    var course = StateManager.loadState('course');//??{ "id": 0, "name": "" };

    return (
        <Navbar sticky="top" className="p-1" bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>Informes de trabajo en grupo</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {userClass === "Student" && course &&
                        <StudentMenu />
                    }
                    {userClass === "Consultant" && course &&
                        <ConsultantMenu />
                    }
                    {userClass !== undefined && course && 
                        <Nav.Link onClick={() => {
                            StateManager.removeState('degree');
                            StateManager.removeState('course');
                            navigate('/app/degreeSelect');
                        }}>
                                <div style={{ flexWrap: 'nowrap' }}>
                                    <FontAwesomeIcon icon={solid('right-left')} />
                                    &nbsp;Cambiar de asignatura
                                </div>
                        </Nav.Link>
                    }
                    <Nav.Link onClick={() => { navigate("./test"); }} >Test</Nav.Link>
                    <Nav.Link onClick={() => { StateManager.clearState(); navigate("/"); }} >Salir</Nav.Link>
                    <Nav.Link >{count}</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MainMenu;
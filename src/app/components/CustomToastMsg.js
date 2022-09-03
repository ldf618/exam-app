import { Toast, Button } from "react-bootstrap";
import PropTypes from 'prop-types';

CustomToastMsg.propTypes = {
    //show modal
    show: PropTypes.bool.isRequired,
    //header text
    header: PropTypes.string,
    //body text
    body: PropTypes.string,    
    //show delay 
    delay: PropTypes.number,
    //variant
    bg: PropTypes.oneOf<String>(['Primary','Secondary','Success','Danger', 'Warning', 'Info', 'Light', 'Dark']),
    //callback function for modal hide
    onClose: PropTypes.func
  };

function CustomToastMsg({show,header,body,delay,bg,onClose}) {
    //   console.log(props);

    return (
        <Toast show={show} onClose={onClose} delay={delay} bg={bg} autohide>
            <Toast.Header>
                <strong className="me-auto">{header}</strong>
            </Toast.Header>
            <Toast.Body>{body} </Toast.Body>
            <div className="m-3 text-end"><Button onClick={onClose} size="sm" variant="outline-primary">Cerrar</Button></div>
        </Toast>
    );
}

export default CustomToastMsg;
import { Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { /*useReducer, createContext*/ useContext } from 'react';
import { OptionsContext } from './ExamQuestionForm';
import OptionForm from './OptionForm';
import { examQuestionType } from "./Exam";


function OptionsForm({questionType}) {

    const { options, setOptions } = useContext(OptionsContext);

    function addOption() {
        options.push({ text: '', isTrue: false })
        setOptions(options);
    }

    //callback from OptionForm
    function deleteOption(index) {
        options.splice(index, 1);
        setOptions([...options]);
    }

    return (
<>
            <Table>
                <thead>
                    <tr>
                        <th className="text-center" width="5%">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Borrar pregunta</Tooltip>}>
                                <div><FontAwesomeIcon icon={solid('trash-can')} /></div>
                            </OverlayTrigger>
                        </th>
                        <th className="text-center" width="5%">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Modificar pregunta</Tooltip>}>
                                <div><FontAwesomeIcon icon={solid('pen')} /></div>
                            </OverlayTrigger>
                        </th>
                        <th width="70%">
                            Enunciado opción
                        </th>
                        {!(questionType==examQuestionType.GRUPAL_SCORE||questionType==examQuestionType.INDIVIDUAL_SCORE)&&
                        <th className="text-center" width="10%">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Marcar pregunta verdadera</Tooltip>}>
                                <div><FontAwesomeIcon icon={solid('check')} /></div>
                            </OverlayTrigger>
                        </th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {options
                        .map((option, index) => {
                            return (<OptionForm onDelete={deleteOption} questionType={questionType} option={option} key={index} index={index} />)
                        }
                        )
                    }

                </tbody>
            </Table>

            <Button className="mt-2" onClick={addOption}>Añadir opción</Button>
            </>
    );
}

export default OptionsForm;
import { Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { useState, useContext } from 'react'
import { OptionsContext } from './ExamQuestionForm'
import OptionForm from './OptionForm'
import { examQuestionType } from "./Exam"


function OptionsForm({questionType}) {

    const { options, setOptions, editedOptions, setEditedOptions, disabledButtons, setDisabledButtons } = useContext(OptionsContext);
    const arr = [];
    options.map(()=>arr.push(false))

    const [disableAddButton, setDisableAddButton] = useState(false);
    //const [editedOption, setEditedOption] = useState(false);
    //const [editedOption, setEditedOption] = useState(arr);

    function addOption() {   
        disabledButtons.forEach((v,i,a)=>a[i] = true)
        setDisabledButtons(disabledButtons.push(true));
        console.log(editedOptions)
        setEditedOptions(editedOptions.push(true));
        options.push({ text: '', isTrue: false })
        setDisableAddButton(true);
    }

    //callback from OptionForm
    function deleteOption(index) {
        options.splice(index, 1);
        setOptions([...options]);
    }

  
    /*
    function changeAddButton(disabled){
        setDisableAddButton(disabled)
    }*/

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
                            return (<OptionForm deleteCallback={deleteOption}
                                                editCallback={(disabled)=>setDisableAddButton(disabled)} 
                                                questionType={questionType} option={option} 
                                                key={index} index={index} 
                                                /*edited={editedOption[index]}*/ />)
                        }
                        )
                    }

                </tbody>
            </Table>

            <Button disabled={disableAddButton} className="mt-2" onClick={addOption}>Añadir opción</Button>
            </>
    );
}

export default OptionsForm;
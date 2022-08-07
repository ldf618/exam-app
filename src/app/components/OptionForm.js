import { Button, Stack, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useState, useContext } from 'react';
import { OptionsContext } from './ExamQuestionForm';
import { examQuestionType } from "./Exam";

function OptionForm({ /*option,*/ questionType, index, deleteCallback, editCallback /*, edited = true*/ }) {
    /*
    const [text, setText] = useState(option.answer); 
    const [isTrue, setIsTrue] = useState(option.isTrue); 
    */

   // const [showEdit, setShowEdit] = useState(edited); 
    const [initialText, setInitialText] = useState(''); 
    const [validatedForm, setValidatedForm] = useState(false); 

    const { options, setOptions, editedOptions, setEditedOptions, disabledButtons, setDisabledButtons } = useContext(OptionsContext);

    //console.log("render:"+index+" edited:"+editedOptions[index])
    
    var checkType = ''
    switch (questionType){
        case examQuestionType.TEST_MULTIPLE_CHOICE.id: 
            checkType="checkbox";
            break;
        case examQuestionType.TEST_SINGLE_CHOICE.id: 
            checkType="radio";
            break;
        default:
    }

    function setText(value){
        options[index].answer=value;
        setOptions(options);
    }
    
    function setIsTrue(){        
        if (checkType==='radio'){
            options.forEach(option=>option.isTrue=false)
            options[index].isTrue=true;
        }
        else{ //checkbox
            options[index].isTrue=!options[index].isTrue;
        }
        setOptions(...options);
    }

    function modifyQuestion (){
        setValidatedForm(false);
        setInitialText(options[index].answer);
        editedOptions[index]=true;
        disabledButtons.forEach((v,i,a)=>a[i] = true)  
        setEditedOptions(...editedOptions);
        //setShowEdit(true);
        editCallback(true);
    }

    function cancelModify (){ 
        editedOptions[index]=false;  
        disabledButtons.forEach((v,i,a)=>a[i] = false)
        setEditedOptions(...editedOptions);
        //setShowEdit(false);
        options[index].answer=initialText;        
        editCallback(false);
    }

    function confirmModify (e){ 
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        else{
            editedOptions[index]=false;
            disabledButtons.forEach((v,i,a)=>a[i] = false)
            setEditedOptions(...editedOptions);
            //setShowEdit(false);
            editCallback(false);
        }
        setValidatedForm(true);
    }

    return (
        <tr>
            <td>
                <Button size="sm" disabled={disabledButtons[index]} onClick={()=>deleteCallback(index)}><FontAwesomeIcon icon={solid('trash-can')} /></Button>
            </td>            
            <td>
                <Button size="sm" disabled={disabledButtons[index]} onClick={modifyQuestion}><FontAwesomeIcon icon={solid('pen-to-square')} /></Button>
            </td>
            <td valign='top'>
                {
                    editedOptions[index] &&
                    <Stack className="align-items-start" direction="horizontal" gap={2}>
                        <Form noValidate validated={validatedForm} id={'optionForm'+index} onSubmit={confirmModify}>
                            <Form.Control autoFocus as="textarea" rows={1} size="sm" cols="70" required value={options[index].answer} onChange={(e)=>setText(e.target.value)}></Form.Control>
                            <Form.Control.Feedback type="invalid">Debe escribir una opción</Form.Control.Feedback>
                        </Form>
                        <Button size="sm" variant="secondary" onClick={cancelModify}><FontAwesomeIcon icon={solid('xmark')} /></Button>
                        <Button size="sm" type="submit" form={'optionForm'+index}><FontAwesomeIcon icon={solid('check')} /></Button>                        
                    </Stack>                    
                }
                {!editedOptions[index] && options[index].answer /*text*/}
            </td>
            {!(questionType===examQuestionType.GRUPAL_SCORE.id||questionType===examQuestionType.INDIVIDUAL_SCORE.id)&&
                <td align="center">
                    <Form.Check type={checkType} name="true" checked={options[index].isTrue /*isTrue*/} onChange={()=>setIsTrue(/*!isTrue*/)}></Form.Check>
                </td>
            }
        </tr>
    );
}

export default OptionForm;
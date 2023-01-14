export const examQuestionType = {
    TEXT_ONLY: { id: 1, desc: "Tipo Texto", type: "FREETEXT" },
    TEST_SINGLE_CHOICE: { id: 2, desc: "Tipo Test Unirespuesta", type: "OPTIONS" },
    TEST_MULTIPLE_CHOICE: { id: 3, desc: "Tipo Test Multirespuesta", type: "OPTIONS" },
    INDIVIDUAL_SCORE: { id: 4, desc: "Tipo Valoracion Individual", type: "INDIVIDUAL_EVALUATION" },
    GRUPAL_SCORE: { id: 5, desc: "Tipo Valoracion Grupo", type: "GROUP_EVALUATION" },
    getDescById: function (id) {
        let value = Object.values(this).find(v => v.id === id);
        if (value === undefined)
            return '';
        else
            return value.desc;
    },
    getTypeById: function (id) {
        console.log(id);
        let value = Object.values(this).find(v => v.id === id);
        console.log(value.type)
        if (value === undefined)
            return '';
        else
            return value.type;
    }
};

export function showQuestionType(type, isMultiple) {
    switch (type) {
        case examQuestionType.TEXT_ONLY.type: return 'Texto libre';
        case examQuestionType.TEST_SINGLE_CHOICE.type: return isMultiple ? 'Multirespuesta' : 'Unirespuesta';
        case examQuestionType.INDIVIDUAL_SCORE.type: return 'Evaluación individual';
        case examQuestionType.GRUPAL_SCORE.type: return 'Evaluacion grupal';
    }
}

export function questionCheckType(isMultipleSel) {
    if (isMultipleSel)
        return "checkbox";
    else
        return "radio";
}

export function isFreetextQuestion(type) {
    if (type === 'FREETEXT')
        return true;
    else
        return false;
}

export function isOptionsQuestion(type) {
    if (type === 'OPTIONS')
        return true;
    else
        return false;
}

export function isIndividualEvalQuestion(type) {
    if (type === 'INDIVIDUAL_EVALUATION')
        return true;
    else
        return false;
}

export function isGroupEvalQuestion(type) {
    if (type === 'GROUP_EVALUATION')
        return true;
    else
        return false;
}

/*returns a complete copy of an object with no references to the original object*/
export function deepCopyObject (object){
    return JSON.parse(JSON.stringify(object));//DeepCopy { ...object};
}

export function getCurrentDate(){
    let d = new Date();
    d.setTime( d.getTime() - new Date().getTimezoneOffset()*60*1000 );
    return d;
}

export function getBaseUrl (){
    return process.env.REACT_APP_API_URL;
}

export function getBase64ImageType (content){
    switch (content?.charAt(0)){
        case '/' : return 'jpg';
        case 'i' : return 'png';
        case 'R' : return 'gif';
        case 'U' : return 'webp';
        default: return null;
    }
}

export function dniValidation(dni){

    if (!dni) return false;
    if (dni.length<2) return false;
    let dniNumbers = dni.slice(0,dni.length-1);
    let dniLetter = dni.slice(-1);
    let remainder = dniNumbers % 23;
    let validLetters='TRWAGMYFPDXBNJZSQVHLCKET';
    let correctDniLetter=validLetters.slice(remainder,remainder+1);

    if (correctDniLetter!=dniLetter.toUpperCase())
        return false;
    else
        return true;
}



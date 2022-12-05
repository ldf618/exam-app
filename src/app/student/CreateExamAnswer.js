import StateManager from '../utils/StateManager';

export default function createExamAnswer(exam){

    var student = StateManager.loadState('localUser');

    let date = new Date();
    let examAnswer={finished:false, creationDate: date, changeDate: date, student:student, exam:exam, examQuestionAnswers:[]};
    const questionAnswers = exam.examQuestions?.map(function(question) {
        let questionAnswer= {examQuestion:question, answer:null, examQuestionOptionAnswer:[]};
        const questionOptionsAnswer= question.examQuestionOptions?.map(function(option){
            return {examQuestionOption:option, answer:null, isSelected:false, score:false}
        })
        questionAnswer.examQuestionOptionAnswer=questionOptionsAnswer;
        return questionAnswer;
    });
    examAnswer.examQuestionAnswers=questionAnswers;

    return (examAnswer);
}
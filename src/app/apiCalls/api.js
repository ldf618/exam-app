const baseURL = process.env.REACT_APP_API_URL;
const abortTime = process.env.REACT_APP_API_TIMEOUT;

function abortTimeout(){
    let controller = new AbortController();
    let signal = controller.signal;
    setTimeout(() => controller.abort(), abortTime);
    return signal;
}

async function checkError (response){
    return await new Promise ((resolve,reject)=>{

        const isJson = response.headers.get('content-type')?.includes('application/json');
        //status 204 = NO_CONTENT
        if (response.ok && response.status!==204 && isJson ){
            resolve(response.json());
        }else if (response.status===204 || !isJson){
            resolve(response.text());
        }else{
            reject(response.text());
        }       
    }
    )
}

async function checkError2 (response){
    const text = await response.text(); // Parse it as text        
    return await new Promise ((resolve,reject)=>{      
        if (response.ok){
            try {                
                const data = JSON.parse(text); // Try to parse it as json
                resolve(data);
            } catch(err) {
                // This probably means your response is text, do you text handling here
                resolve(text);
            }
        }else{
            reject(text);
        }
    })
}

async function fetchGet (url){
    let signal = abortTimeout(); 
    const options = {
        method: "GET",
        headers:{
          "Accept":"application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
        },
        mode:"cors",
        credentials: 'include',
        signal:signal
    };
    return fetch(baseURL+url,options/*{signal}*/).then(checkError2)
}

async function fetchPost (url, data){
    //let signal = abortTimeout(); data can be saved despite abort signal was sent
    const options = {
        method: "POST",
        headers:{
          "Content-Type": "application/json", 
          "Accept":"application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
        },
        mode:"cors",
        credentials: 'include',
        body:JSON.stringify(data)//, signal:signal
    };

    return  fetch(baseURL+url,options).then(checkError2)
}

export async function findAllDegrees ()  {
    return fetchGet("/degree/degrees");
}

export async function saveDegree (data)  {
    return fetchPost("/degree/degree",data);
}

export async function countByDegreeName (data)  {
    return fetchGet("/degree/countbyname/"+data);
}

export async function existsByDegreeName (data)  {
    return fetchGet("/degree/existsbyname/"+data);
}
/*
export async function degreesByStudentId (data)  {
    return fetchGet("/degree/degreesByStudentId/"+data);
}
*/

export async function degreesByUserId (id,userType)  {
    return fetchGet("/degree/degreesByUserId/"+id+"/"+userType);
}

export async function authenticateUser (data)  {
    return fetchPost("/auth/loginCookie",data);
}

export async function userByName (data)  {
    return fetchGet("/user/"+data);
}

export async function coursesByStudentIdDegreeId (studentId, degreeId)  {
    return fetchGet("/course/coursesStudentDegree/"+studentId+"/"+degreeId);
}
/*
export async function coursesByConsultantIdDegreeId (consultantId, degreeId)  {
    return fetchGet("/course/coursesConsultantDegree/"+consultantId+"/"+degreeId);
}
*/

export async function coursesByUserIdDegreeId (consultantId, degreeId, userType)  {
    return fetchGet("/course/coursesUserDegree/"+consultantId+"/"+degreeId+"/"+userType);
} 
/*
export async function classroomByStudentIdAndCourseId (studentId, courseId)  {
    return fetchGet("/classroom/classroomStudentCourse/"+studentId+"/"+courseId);
}

export async function classroomByConsultantIdAndCourseId (consultantId, courseId)  {
    return fetchGet("/classroom/classroomConsultantCourse/"+consultantId+"/"+courseId);
}
*/

export async function classroomByUserIdAndCourseId (consultantId, courseId, userType)  {
    return fetchGet("/classroom/classroomUserCourse/"+consultantId+"/"+courseId+"/"+userType);
}

export async function groupByStudentIdAndCourseId (studentId, courseId)  {
    return fetchGet("/group/groupStudentCourse/"+studentId+"/"+courseId);
}

export async function groupByConsultantIdAndCourseId (consultantId, courseId)  {
    return fetchGet("/group/groupConsultantCourse/"+consultantId+"/"+courseId);
}

export async function saveExam (data)  {
    return fetchPost("/exam/exam",data);
}

export async function searchExam (data)  {
    return fetchPost("/exam/examSearch",data);
}

export async function updatePublicationDate (data)  {
    return fetchPost("/exam/updatePublicationDate",data);
}

export async function deleteExam (data)  {
    return fetchPost("/exam/deleteExam",data);
}

export async function test (data)  {
    return fetchPost("/exam/test",data);
}

export async function saveExamAnswer (data)  {
    return fetchPost("/examAnswer/examAnswer",data);
}
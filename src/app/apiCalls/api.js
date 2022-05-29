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
        if (response.ok){
            resolve(response.json());
        }else{
            reject(response.text());
        }       
    }
    )
}

async function fetchGet (url){
    let signal = abortTimeout(); 
    return fetch(baseURL+url,{signal}).then(checkError)
}

async function fetchPost (url, data){
    //let signal = abortTimeout(); data can be saved despite abort signal was sent
    const options = {
        method: "POST",
        headers:{
          "Content-Type": "application/json", 
          //"Accept":"application/json",
          //"mode":"no-cors",
        },
        body:JSON.stringify(data)//, signal:signal
    };

    return  fetch(baseURL+url,options).then(checkError)
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
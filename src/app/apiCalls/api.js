const baseURL = process.env.REACT_APP_API_URL;
const abortTime = process.env.REACT_APP_API_TIMEOUT;

async function checkError (response){
    if (!response.ok) throw new Error(response.statusText);
    return response;
}

function abortTimeout(){
    let controller = new AbortController();
    let signal = controller.signal;
    setTimeout(() => controller.abort(), abortTime);
    return signal;
}
/*
export async function findAllDegrees ()  {
    let signal = abortTimeout();
    return fetch(baseURL+"/degrees",{signal}).then(checkError);
 }
 */

 export async function fetchGet (url){
    let signal = abortTimeout(); 
    return await new Promise ((resolve,reject)=>{
        fetch(baseURL+url,{signal})
            .then(checkError)
            .then(response=>{resolve(response.json())})
            .catch(error=>{reject(error)});
    })    
}

export async function findAllDegrees ()  {
    return fetchGet("/degrees");
}

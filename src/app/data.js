let users = [
  {
    firstName: "Nombre1",
    surname1: "Surname11",
    surname2: "Surname22",
    userDni: "12345678W",
    userClass: "Student",
    userName: "student1",
    userPassword: "1234",
    classroom:{
      name:"Aula1",
    },
    group:{
      name:"Grupo1",
    },    
  },
  {
    firstName: "Nombre2",
    surname1: "Surname21",
    surname2: "Surname22",
    userDni: "22345678W",
    userClass: "Student",
    userName: "student2",
    userPassword: "1234",
    classroom:{
      name:"Aula1",
    },
    group:{
      name:"Grupo1",
    },        
  },
  {
    firstName: "Nombre3",
    surname1: "Surname31",
    surname2: "Surname32",
    userDni: "32345678W",
    userClass: "Consultant",
    userName: "consultant1",
    userPassword: "1234",
    classroom:{
      name:"Aula1",
    },  
  },
  {
    firstName: "Nombre4",
    surname1: "Surname41",
    surname2: "Surname42",
    userDni: "42345678W",
    userClass: "Consultant",
    userName: "consultant2",
    userPassword: "1234",
    classroom:{
      name:"Aula1",
    },    
  }  
];

export function getUsers() {
  return users;
}

export function getUser(dni) {
    return users.find(user=>user.userDni===dni);
  }

export function getConsultants() {
    return users.filter(user=>user.userClass==="Consultants");
}

export function getStudents() {
    return users.filter(user=>user.userClass==="Students");
}

export function authenticate (uName,uPass) {
  return users.find(user=>(user.userName===uName && user.userPassword===uPass));
}


//no se usa
export function plainObject (object) {
  var resultObject="{";
  
  Object.entries(object).forEach( 
    function([key,value]){           
      if ((typeof value)!="object")
        resultObject+='"'+key+'"'+":"+'"'+value+'"'+",";
      }
    );
    resultObject=resultObject.slice(0,-1);
    resultObject+="}";
  return resultObject;
}

//no se usa
export function objToString(obj, ndeep) {
  if(obj == null){ return String(obj); }
  switch(typeof obj){
    case "string": return '"'+obj+'"';
    case "function": return obj.name || obj.toString();
    case "object":
      var indent = Array(ndeep||1).join('\t'), isArray = Array.isArray(obj);
      return '{['[+isArray] + Object.keys(obj).map(function(key){
           return '\n\t' + indent + key + ': ' + objToString(obj[key], (ndeep||1)+1);
         }).join(',') + '\n' + indent + '}]'[+isArray];
    default: return obj.toString();
  }
}

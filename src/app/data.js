let users = [
  {
    firstName: "Alicia",
    surname1: "Verdu",
    surname2: "Garrido",
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
    firstName: "Narciso",
    surname1: "Ruano",
    surname2: "Matas",
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
    firstName: "Joaquim",
    surname1: "Arranz",
    surname2: "Campoy",
    userDni: "32345678W",
    userClass: "Consultant",
    userName: "consultant1",
    userPassword: "1234",
    classroom:{
      name:"Aula1",
    },  
  },
  {
    firstName: "Silvia",
    surname1: "Bolaños",
    surname2: "Cuevas",
    userDni: "42345678W",
    userClass: "Consultant",
    userName: "consultant2",
    userPassword: "1234",
    classroom:{
      name:"Aula1",
    },    
  }  
];

let degrees = [
  {
    id:1,
    name: "Ingenieria informatica",
    courses:[
    {
        id:1,
        name: "Programacion 1",
        credits:12,
    },
    {
        id:2,
        name: "Programacion 2",
        credits:12,
    },
    {
        id:3,
        name: "Matematicas 1",
        credits:12,
    },
    {
        id:4,
        name: "Fisica 1",
        credits:12,
    },
    {
        id:5,
        name: "Logica ",
        credits:12,
    },
    ]
  },
  {
    id:2,
    name: "Arquitectura",
    courses:[
      {
        id:6,
        name: "Dibujo 1",
        credits:12,
      },
      {
        id:7,
        name: "Dibujo 2",
        credits:12,
      },
      {
        id:8,
        name: "Matematicas 1",
        credits:12,
      },
      {
        id:9,
        name: "Fisica 1",
        credits:12,
      },
      {
        id:10,
        name: "Calculo ",
        credits:12,
      }
    ]    
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

//-------------------------------------------------------
export function getDegrees() {
  return degrees;
}

export function getDegree(id) {
  return degrees.filter(degree=>degree.id==id);
}

export function getCourses(id) {
  let degree = degrees.find(degree=>degree.id==id);
  if (typeof degree != 'undefined')
    return degree.courses;
  else 
    return [];
}

//no se usa
export function plainObject (object) {
  var resultObject="{";
  
  Object.entries(object).forEach( 
    function([key,value]){           
      if ((typeof value)!="object")
        resultObject+='"'+key+'":"'+value+'",';
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

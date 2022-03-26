let users = [
  {
    firstName: "Nombre1",
    surname1: "Surname11",
    surname2: "Surname22",
    userDni: "12345678W",
    userClass: "Student",
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

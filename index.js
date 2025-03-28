

const mainFunction=async()=>{
const createUser=async()=>{
    console.log("user")
   
}
const createCorporate=async()=>{
    console.log("corporate")
}
const createAdmin=async()=>{
    console.log("admin")
}


await createUser();
await createCorporate();


 Promise.all([createCorporate,createUser]).then(()=>{
     createAdmin();
}).catch((err)=>{
    console.log(err)
})


}


mainFunction();
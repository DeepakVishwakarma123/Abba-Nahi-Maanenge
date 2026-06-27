let data=false

let testing=new Promise(
    (resolve,reject) => {
        setTimeout(() => {
          console.log("i will be best");
          resolve("resolved now")
          
        }, 10000);
    }
)


let testing1=new Promise(
    (resolve,reject) => {
        setTimeout(() => {
        console.log("fastest");
        
        }, 1000);
    }
)


let testing2=new Promise(
    (resolve,reject) => {
        setTimeout(() => {
          data=true
          resolve("fast")
        }, 20000);
    }
)


console.log("hello")

async function wait(params) {
   console.log("inside function")
   let response=await testing;
   console.log("done");
}

wait()

console.log("end of first function");


fast()

async function fast(params) {
   console.log("inside function fast")
   let response=await testing2;
   console.log("waiting");
   
   testing1.then(
    () => {
        console.log("i am urgent");
    }
   )
   console.log("done fast");
}


console.log("end of second function");


//hello
//inside function
//promise wait ---                        [callback register1]
  //
//enf of first function

//inside function fast
//promise wait                              [callback register1,callback register2]
  //

 //end of second function 
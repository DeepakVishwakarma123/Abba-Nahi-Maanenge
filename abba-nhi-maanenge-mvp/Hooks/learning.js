let data=false

let ca=new Array()
ca["x"]=2
ca[3]=3

console.log(ca);





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
        resolve("done")
        
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


let c={

}

c.rohit="keep do it nwo"
c.test="hello"
c.keep="jest"
c.peep="riti"
console.log(c);


for(let keys in c)
{
  console.log(keys);
  
}

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


//test


    let currentProfile=new Map()
    currentProfile.set(`test`,2)
    currentProfile.set("isActive",false)

    console.log(currentProfile);

    let ac=[2]
    let kes={
      1:2
    }


    ac.push(currentProfile)
    ac[1].set("s",2)
    ac.push(kes)
    console.log(ac[0]);
    
    console.log(ac);


    let kc=JSON.stringify(ac)
    console.log("sdf",kc);
    
    
    localStorage.setItem("test",JSON.stringify(ac))


let k2={
  see:"sdfs",
  asdf:32
}

console.log(k2);

// let k={
//   'apple': 1,
//     'banana': 2,
//     3: 'three',
//     1: 'one',
//     'zebra': 3,
//     10: 'ten'
// }

// console.log(k);



console.log(a);

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
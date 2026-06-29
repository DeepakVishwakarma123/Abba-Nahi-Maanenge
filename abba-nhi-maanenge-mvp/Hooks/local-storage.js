// hook for saving data to local storage
let devProfiles={
        
"devProfiles":[
        {
            url:"https://github.com"
        },
        {
          url:"https://behance.com"
        },
        {
            url:"https://wikipedia.com"
        }
    ],
    "isActive":true
    
}





let AllProfiles=[devProfiles]



function Toast(isError,message)
{   
    let mainBox=document.createElement("div")
    let sideMenu=document.querySelector(".sideClosemain")
    isError?mainBox.classList.add("toastError"):mainBox.classList.add("toastSuccess")
    mainBox.textContent=message
    sideMenu.appendChild(mainBox)
    setTimeout(
        () => {
            mainBox.remove()
        },2000 
    )
}


async function saveProfileToLocal(key,value)
{   
    console.log("saved run early i think so");
    
    try {
        let PromiseResolved=await chrome.storage.local.set({[key]:value})
        console.log("setting is fast !!!!!!!!!!!!!!!!!!!!11");
        
        return PromiseResolved
    } catch (error) {
        return "Problem Occured While Saving"
    }
}


async function getProfileData(key) {
    try {
         console.log("test it out");
         
        let savedProfile=await chrome.storage.local.get(`${key}`)

        console.log("saved Profiles are",savedProfile["AllProfiles"]);
        
        return savedProfile
    } catch (error) {
        return "Error At Retrival"
    }
}


export {saveProfileToLocal,AllProfiles,getProfileData,Toast}
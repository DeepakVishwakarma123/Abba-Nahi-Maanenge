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
    try {
        let PromiseResolved=await chrome.storage.local.set({[key]:value})    
        return PromiseResolved
    } catch (error) {
        return "Problem Occured While Saving"
    }
}


async function getProfileData(key) {
    try {
        let savedProfile=await chrome.storage.local.get(`${key}`)
        return savedProfile
    } catch (error) {
        return "Error At Retrival"
    }
}


export {saveProfileToLocal,AllProfiles,getProfileData,Toast}
import { saveProfileToLocal,AllProfiles,getProfileData } from "./Hooks/local-storage.js"


let buttonSetting=document.querySelector("#buttonSetting")
let closeButton=document.querySelector("#closeButton")
let profileName=document.querySelector("#profileName")
let url=document.querySelector("#url")
let addButton=document.querySelector(".addButton")


function saveUrlToCurrentProfile()
{    
    let profileNameString=profileName.value
    let userCustomUrl=url.value

    console.log(profileNameString);
    


    let urlObject={
        [url]:userCustomUrl
    }
    let arrayOfUrlObjects=[]
    arrayOfUrlObjects.push(urlObject)
    let currentProfile={
        [profileNameString]:arrayOfUrlObjects,
        isActive:true
    }
    console.log("current Profile is now",currentProfile);
    
    //first of all get the data
    let savedAllProfiles=getProfileData("AllProfiles")
    savedAllProfiles.then(
        (savedProfiles) => console.log("all saved Profiles are now",savedProfiles)
        ).catch(
            (err) => console.error("error",err)
        )
}


let sideMenu=document.querySelector(".sideMenu")
function moveToleft()
{
    sideMenu.classList.add('moveToleft')
}
function hideTheMenu(){
    sideMenu.classList.remove('moveToleft')
}
buttonSetting.addEventListener('click',moveToleft)
closeButton.addEventListener('click',hideTheMenu)
addButton.addEventListener('click',saveUrlToCurrentProfile)

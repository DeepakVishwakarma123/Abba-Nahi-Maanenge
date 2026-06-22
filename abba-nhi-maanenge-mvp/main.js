import { saveProfileToLocal,AllProfiles,getProfileData } from "./Hooks/local-storage.js"


let buttonSetting=document.querySelector("#buttonSetting")
let closeButton=document.querySelector("#closeButton")
let profileName=document.querySelector("#profileName")
let url=document.querySelector("#url")
let addButton=document.querySelector(".addButton")


async function saveUrlToCurrentProfile()
{    
    let profileNameString=profileName.value
    let userCustomUrl=url.value

    console.log(profileNameString);
    


    let urlObject={
        url:userCustomUrl
    }
    let arrayOfUrlObjects=[]
    arrayOfUrlObjects.push(urlObject)
    let currentProfile={
        [profileNameString]:arrayOfUrlObjects,
        isActive:true
    }
    console.log("current Profile is now",currentProfile);
    
    let allProfileData;
    //first of all get the data
    let savedAllProfiles=await getProfileData("AllProfiles")
    allProfileData=savedAllProfiles["AllProfiles"]
    allProfileData.push(currentProfile)
    //savign data to current storage 
    console.log(allProfileData)
    saveProfileToLocal("AllProfiles",allProfileData).then(
        (res) => {
            console.log(allProfileData);
            
            console.log("data saved succesfully",res);
            
        }
    ).catch(
        (err) => {
            console.error("during saving error happended",err)
        }
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

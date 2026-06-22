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
    
    let urlObject={
        url:userCustomUrl
    }
    
    let arrayOfUrlObjects=[]
    arrayOfUrlObjects.push(urlObject)
    let currentProfile={
        [profileNameString]:arrayOfUrlObjects,
        isActive:true
    }
    
    console.log(profileNameString);
    

//    basic structure is creating is here ends
if(profileNameString==="" || userCustomUrl==="")
{
    console.error("name and url filled properly")
    return
}   

//loop through on data to check whether profile exists or not
//based on data add new field either update the old one with existing data
    
    let allProfileData;
    //first of all get the data
    let savedAllProfiles=await getProfileData("AllProfiles")
    allProfileData=savedAllProfiles["AllProfiles"]
    //before pushing things whether profile is exist or not
    for(let userCustomProfiles of allProfileData)
    {
        if(userCustomProfiles.hasOwnProperty(profileNameString))
        {
        //don,t push new whole object 
        let arrayOfUrlObjects_inner=userCustomProfiles[profileNameString]
        if(arrayOfUrlObjects_inner.length===5)
        {
            console.error("max url per profile reached")
            return
        }
        arrayOfUrlObjects_inner.push(urlObject)
        //now save current whole object to storage again
        await saveProfileToLocal("AllProfiles",allProfileData)
        return
        }
    }
    allProfileData.push(currentProfile)
    //savign data to current storage 
    saveProfileToLocal("AllProfiles",allProfileData).then(
        (res) => {
            console.log("data saved succesfully");
            
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

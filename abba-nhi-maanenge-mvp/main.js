import { saveProfileToLocal,AllProfiles,getProfileData } from "./Hooks/local-storage.js"


let buttonSetting=document.querySelector("#buttonSetting")
let closeButton=document.querySelector("#closeButton")
let profileName=document.querySelector("#profileName")
let url=document.querySelector("#url")
let addButton=document.querySelector(".addButton")
let selectElement=document.querySelector(".selectProfile")
let sideMenu=document.querySelector(".sideMenu")
let saveChoiceButton=document.querySelector(".saveChoice")
let mainHolder=document.querySelector(".mainHolder")








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
        isActive:false
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


async function RenderProfiles() {
    //get data form local storage
   let userProfilesObject=await getProfileData("AllProfiles")
   let userProfilesArray=userProfilesObject["AllProfiles"]
   console.log(userProfilesArray);
   
   //refer the active Profiles
   for(let profileDataObject of userProfilesArray)
   {
    console.log("test evey thi",profileDataObject);
    
    let keysOfActiveProfileDataObject=Object.keys(profileDataObject)
    let isActiveAdd=false
    if(profileDataObject["isActive"])
    {   
        isActiveAdd=true
        //creating a custom option tag which selected opton
        console.log('keys',keysOfActiveProfileDataObject)
        let option=document.createElement("option")
        option.value=keysOfActiveProfileDataObject[0]
        option.text=keysOfActiveProfileDataObject[0]
        option.label=keysOfActiveProfileDataObject[0]
        // text is not visible
        console.log(option);
        console.log(selectElement);
        
        selectElement.append(option)
               
        //rendering active url's
        let allUrlofActive=profileDataObject[keysOfActiveProfileDataObject[0]]
        console.log('active all url',allUrlofActive);
        
        for(let linkAddressObject of allUrlofActive)
        {   
            let divboxofUrl=document.createElement("div")
            let linkFullurl=document.createElement("p")
            let deleteButton=document.createElement("button")
            deleteButton.textContent="Delete"
            divboxofUrl.classList.add('urlPerProfile')
            deleteButton.classList.add('deleteButton')
            deleteButton.classList.add('deleteButton')
            let linkAddress=linkAddressObject["url"]
            linkFullurl.textContent=linkAddress
            divboxofUrl.appendChild(linkFullurl)
            divboxofUrl.appendChild(deleteButton)
            mainHolder.appendChild(divboxofUrl)
        }
    }
    if(isActiveAdd)
    {
        console.log("hello");
        
        continue
    }
   let option=document.createElement("option")
    option.value=keysOfActiveProfileDataObject[0]
    option.text=keysOfActiveProfileDataObject[0]
      option.label=keysOfActiveProfileDataObject[0]
    selectElement.appendChild(option)
   }


   console.log(userProfilesArray)
}

RenderProfiles()

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

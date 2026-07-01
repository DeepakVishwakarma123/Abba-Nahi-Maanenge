import { saveProfileToLocal,AllProfiles,getProfileData,Toast } from "./Hooks/local-storage.js"


let buttonSetting=document.querySelector("#buttonSetting")
let closeButton=document.querySelector("#closeButton")
let profileName=document.querySelector("#profileName")
let url=document.querySelector("#url")
let addButton=document.querySelector(".addButton")
let selectElement=document.querySelector(".selectProfile")
let sideMenu=document.querySelector(".sideMenu")
let saveChoiceButton=document.querySelector(".saveChoice")
let mainHolder=document.querySelector(".mainHolder")
let hotProfile=document.querySelector(".hotProfile")



renderActiveProfileOnmainPopUP()

async function saveUrlToCurrentProfile()
{      
  
    let profileNameString=profileName.value
    
    let userCustomUrl=url.value
    let urlLength=userCustomUrl.length    
    let urlObject={
        url:userCustomUrl
    }
    
    let arrayOfUrlObjects=[]
    arrayOfUrlObjects.push(urlObject)
    
    
    let currentProfile={}
    currentProfile[`${profileNameString}`]=arrayOfUrlObjects
    currentProfile["isActive"]=false
    
//    basic structure is creating is here ends

if(profileNameString==="" || userCustomUrl==="")
{   
    Toast(true,'⚠️ Name/URL missing')
    console.error("name and url filled properly")
    return
}

if(urlLength>22)
{   
    Toast(true,'⚠️ URL too long')
    console.error("Long Url Not Supported Add Short Url")
    return
}


//loop through on data to check whether profile exists or not
//based on data add new field either update the old one with existing data
    
    let allProfileData;
    let savedAllProfiles=await getProfileData("AllProfiles")
    //shallow copy to fix reference issues
    allProfileData=savedAllProfiles["AllProfiles"].slice()
    // before pushing things whether profile is exist or not
    for(let userCustomProfiles of allProfileData)
    {   
        
        if(userCustomProfiles.hasOwnProperty(profileNameString))
        { 
        // don,t push new whole object 
        let arrayOfUrlObjects_inner=userCustomProfiles[profileNameString]
        if(arrayOfUrlObjects_inner.length===5)
        {   
            Toast(true,"⚠️ Max 5 URLs allowed")
            console.error("max url per profile reached")
            return
        }
        
        arrayOfUrlObjects_inner.push(urlObject)
        //now save current whole object to storage again
        await saveProfileToLocal("AllProfiles",allProfileData)
        Toast(false,"✅ URL added")         
        return
        } 
    }
    allProfileData.push(currentProfile)  
    console.log(allProfileData);

      
    saveProfileToLocal("AllProfiles",allProfileData).then(
        (res) => {
            console.log(res);
            
            console.log("data saved succesfully");   
            Toast(false,"✅ Profile created")
            
      
      
      let lastElement=allProfileData[allProfileData.length-1]
      console.log("last elemetn is",lastElement);

    let option=document.createElement("option")
    let keysOfActiveProfileDataObject=Object.keys(lastElement)
    console.log(keysOfActiveProfileDataObject);

    if(keysOfActiveProfileDataObject[0]==="isActive")
    {
    option.value=keysOfActiveProfileDataObject[1]
    option.text=keysOfActiveProfileDataObject[1]
    option.label=keysOfActiveProfileDataObject[1]
    }else{
        option.value=keysOfActiveProfileDataObject[0]
        option.text=keysOfActiveProfileDataObject[0]
        option.label=keysOfActiveProfileDataObject[0]
    }
    
    selectElement.append(option)

    profileName.value=""
    url.value=""
                

        }
    ).catch(
        (err) => {
            console.error("during saving error happended",err)
            Toast(true,"something went wrong")
        }
    )
}


async function RenderProfiles() {
    //get data form local storage
   let userProfilesObject=await getProfileData("AllProfiles")
   let userProfilesArray=userProfilesObject["AllProfiles"]
   
   //refer the active Profiles
   for(let profileDataObject of userProfilesArray)
   {
    let keysOfActiveProfileDataObject=Object.keys(profileDataObject)
    let option=document.createElement("option")
    console.log(keysOfActiveProfileDataObject);

    if(keysOfActiveProfileDataObject[0]==="isActive")
    {
    option.value=keysOfActiveProfileDataObject[1]
    option.text=keysOfActiveProfileDataObject[1]
    option.label=keysOfActiveProfileDataObject[1]
    }else{
        option.value=keysOfActiveProfileDataObject[0]
        option.text=keysOfActiveProfileDataObject[0]
        option.label=keysOfActiveProfileDataObject[0]
    }
    
    if(profileDataObject["isActive"])
    {
        option.selected=true
    }
    selectElement.appendChild(option)
}
renderLinks()
}


async function renderLinks()
{
    
   let userProfilesObject=await getProfileData("AllProfiles")
   let userProfilesArray=userProfilesObject["AllProfiles"]
    for(let profileDataObject of userProfilesArray)
   {      
    let keysOfActiveProfileDataObject=Object.keys(profileDataObject)
    let allUrlofActive=profileDataObject[keysOfActiveProfileDataObject[0]]
    if(keysOfActiveProfileDataObject[0]==="isActive")
    {
        allUrlofActive=profileDataObject[keysOfActiveProfileDataObject[1]]
        
    }
    if(profileDataObject["isActive"])
    {   
      for(let linkAddressObject of allUrlofActive)
        {       
            let divboxofUrl=document.createElement("div")
            let linkFullurl=document.createElement("p")
            let deleteButton=document.createElement("button")
            deleteButton.textContent="Delete"
            divboxofUrl.classList.add('urlPerProfile')
            deleteButton.classList.add('deleteButton')
            deleteButton.classList.add('deleteButton')
            deleteButton.addEventListener('click',deleteProfileUrl)
            let linkAddress=linkAddressObject["url"]
            linkFullurl.textContent=linkAddress
            divboxofUrl.appendChild(linkFullurl)
            divboxofUrl.appendChild(deleteButton)
            mainHolder.appendChild(divboxofUrl)
        }
    }
}
}

async function deleteProfileUrl(e) {
  //grab the active profile at that time from select menu
   let selectedOptionArray=Array.from(selectElement.selectedOptions)
   let activeProfileonSelectionText=selectedOptionArray[0].textContent
   let userProfilesObject=await getProfileData("AllProfiles")
   let userProfilesArray=userProfilesObject["AllProfiles"]
   let UrlToDelete=e.target.parentElement.firstElementChild.textContent
     for(let profileDataObject of userProfilesArray)
   {    
    let keysOfActiveProfileDataObject=Object.keys(profileDataObject)
    let allUrlofActive=profileDataObject[keysOfActiveProfileDataObject[0]]
    //changin reference from 0 keys to 1 keys
    if(keysOfActiveProfileDataObject[0]==="isActive" && keysOfActiveProfileDataObject[1]===activeProfileonSelectionText)
    {
        allUrlofActive=profileDataObject[keysOfActiveProfileDataObject[1]]
          for(let indexCount in allUrlofActive)
        {
            if(allUrlofActive[indexCount]["url"]===UrlToDelete && allUrlofActive.length>2)
            {
                allUrlofActive.splice(indexCount,1)     
                e.target.parentElement.remove()  
                Toast(false,"✅ url deleted")         
                break;
            }
            else{
                console.error('⚠️ Max 3 removals')
                Toast(true,"⚠️ Max 3 removals")
                return   
            }
        } 
    }
    
     if(keysOfActiveProfileDataObject[0]===activeProfileonSelectionText)
    {   
         for(let indexCount in allUrlofActive)
        {
            if(allUrlofActive[indexCount]["url"]===UrlToDelete && allUrlofActive.length>2)
            {
                allUrlofActive.splice(indexCount,1)     
                e.target.parentElement.remove()  
                Toast(false,"✅ url deleted")         
                break;
            }
            else{
                console.error('⚠️ Max 3 removals')
                Toast(true,"⚠️ Max 3 removals")
                return   
            }
        } 
    }
    let resolvedState=await saveProfileToLocal("AllProfiles",userProfilesArray)
    console.log("deleted succesfully");
}
}



async function updateActiveProfileState() {
   
   let userProfilesObject=await getProfileData("AllProfiles")
   let userProfilesArray=userProfilesObject["AllProfiles"]
   //converting html collection to array
   let selectedOptionArray=Array.from(selectElement.selectedOptions)
   let activeProfileonSelectionText=selectedOptionArray[0].textContent
   for(let profileDataObject of userProfilesArray)
   {
    let keysOfActiveProfileDataObject=Object.keys(profileDataObject)
    //removing exisiting save Profile state
    if(profileDataObject["isActive"])
    {
        profileDataObject["isActive"]=false
    }
    if(keysOfActiveProfileDataObject[0]==="isActive" && keysOfActiveProfileDataObject[1]===activeProfileonSelectionText)
    {  

        profileDataObject["isActive"]=true
    }
       if(keysOfActiveProfileDataObject[0]===activeProfileonSelectionText)
        {
            profileDataObject["isActive"]=true
        }
   }
   let resolvedState=await saveProfileToLocal("AllProfiles",userProfilesArray)
   Toast(false,"✅ Active profile changed")
   let childrenArray=Array.from(mainHolder.children)
   for(let element of childrenArray)
   {
    element.remove()
   }
   renderLinks()
   renderActiveProfileOnmainPopUP()
}


async function renderActiveProfileOnmainPopUP() {
   let userProfilesObject=await getProfileData("AllProfiles")
   let userProfilesArray=userProfilesObject["AllProfiles"]
   for(let profileDataObject of userProfilesArray)
    {
    let keysOfActiveProfileDataObject=Object.keys(profileDataObject)
    //removing exisiting save Profile state
    if(profileDataObject["isActive"])
    {   
        if(keysOfActiveProfileDataObject[0]==="isActive")
        {
            hotProfile.textContent=`${keysOfActiveProfileDataObject[1]} Loaded`
        }else{
            hotProfile.textContent=`${keysOfActiveProfileDataObject[0]} Loaded`
        }
        break
    }
   }
}

selectElement.addEventListener('change',updateActiveProfileState)

// updateActiveProfileState()

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

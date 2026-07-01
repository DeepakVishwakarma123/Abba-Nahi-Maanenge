import { saveProfileToLocal,getProfileData, AllProfiles } from "./Hooks/local-storage.js";

// delete the tab single

// chrome.runtime.onInstalled.addListener(
//     (object) => {
//        if(object["reason"]==="install")
//        {
//         chrome.tabs.create(
//             {
//                 url:"https://youtube.com/@deepak420re4"
//             }
//         )
//        }
//     }
// )



//saving default data to the local storage for default settings

async function savedDefaultData() {
    //key not present in local it return {} empty object
let defaultSavedData=await getProfileData("AllProfiles")
console.log("default saved data",defaultSavedData);
let defaultSavedDataKeys=Object.keys(defaultSavedData)
if(defaultSavedDataKeys.length===0)
{   

    saveProfileToLocal("AllProfiles",AllProfiles).then(
        () => {
            console.log("result saved successfully")
        }
    ).catch(
        (error) => console.log("something happend")
        
    )  
}
else{    
    return 
}   
}

savedDefaultData()


async function getCurrentTab() {
 let windowsInfo=await chrome.windows.getAll({populate:true})
 let tabsInfoAcrossWindows=windowsInfo.map((info) => info.tabs)
 //the windows info returns an array containing array of object of windows with properties such as tabs array 
 // like this structure 
 //let tabInfoAcrossWindows=[[{},{}],[{},{}]] 
 let mergedTabInfo=tabsInfoAcrossWindows.flat(Infinity)
 return mergedTabInfo
}


// async function  always return promise we cautious while using it

chrome.commands.onCommand.addListener((command) => {
  if(command==="panic-key")
  {
    clearRecentHistory()
    GetallTab()
    clearBrowsingData()
  }
});




async function GetallTab()
{
// we gather active and unactivve tabs info first  
//after that we try to create some tab 
let alltabsPromise=getCurrentTab()
let AllsavedProfiles;
let userProfiles=await getProfileData("AllProfiles")
AllsavedProfiles=userProfiles["AllProfiles"]
for(let currentTabUrlObject of AllsavedProfiles)
{          
    if(currentTabUrlObject["isActive"])
    {         

               //creating current profile object to retrive its keys to access all custom url of each profile
            let currentProfile=Object.keys(currentTabUrlObject)
            let currentProfileArray
            //creating another loop to iterate overl all links
            if(currentProfile[0]==="isActive")
            {
             currentProfileArray=currentTabUrlObject[currentProfile[1]]
            }
            else{
                 currentProfileArray=currentTabUrlObject[currentProfile[0]]
            }
            for(let currentUrlObject of currentProfileArray)
            {    
                
                try {
             let wait=await chrome.tabs.create(
                 currentUrlObject
                )
                console.log("tab is created");
                
            }
            catch(err){
                console.log("error happended");
            }
            }
    }
}



alltabsPromise.then(
    (restultofAlltab) => 
        {   
            
            let AlltabId=restultofAlltab.map(
                (tabInfo) => tabInfo.id
                
            )
            console.log("the all tab id is",AlltabId)
            removeAllActiveTab(AlltabId)
        }
            
)
}

function removeAllActiveTab(arrayOfallTabIds)
{
chrome.tabs.remove(
        arrayOfallTabIds
).then(
    (response) => {
        console.log('tabs are cleared')
    }
).catch(
    (err) => console.error('something went wrong')
)
}

async function clearRecentHistory()
{   
    let dateObject=new Date()
    // current time in milliseconds
    let currentTime=Date.now()
    let millisecondInhour=3600000
    let pastHour=currentTime-millisecondInhour
    let historyClear=await chrome.history.deleteRange(
        {
            startTime:pastHour,
            endTime:currentTime
        }
    )
    console.log("history clear status",historyClear)
}

//callback
function informUser() {
    //informing user things are cleared now
    console.log('data is cleared now feel free to chill you are safe!')
}

//currently we hardcoded to just half a week ago data
async function clearBrowsingData(){
    //currently we delting history across protected and unprotected both routes
    //but in v2 we are gone add featues such as which allows user to decide what to 
    //include or exclude during clean up and sign ups
    let millisecondsPerWeek=1000*60*60*24*365
    let dateObject=new Date()
    let currentTimeinMilliseconds=dateObject.getTime()
    let oneWeekago=currentTimeinMilliseconds-millisecondsPerWeek
    let promiseResolvedResult=await chrome.browsingData.remove(
        {
            "since":oneWeekago,
            "originTypes":{
                "protectedWeb":true,
                "unprotectedWeb":true,
                // "extension":true
            }
            // "excludeOrigins":["https://github.com"]
        },{
          "appcache": true,
          "cache": true,
          "cacheStorage": true,
          "cookies": true,
          "downloads": true,
        //   "history":true,
          "fileSystems": true,
          "formData": true,
          "history":true,
          "indexedDB": true,
          "localStorage": true,
          "webSQL": true
        },
        informUser
    )
    console.log("resolved promise after cleanign is",promiseResolvedResult);
    
}
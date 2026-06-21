import { saveProfileToLocal,getProfileData, AllProfiles } from "./Hooks/local-storage.js";

// delete the tab single

// create a tab
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
saveProfileToLocal("AllProfiles",AllProfiles).then(
    () => {
        console.log("result saved successfully")
    }
).catch(
    (error) => console.log("something happend")
    
)


async function getCurrentTab() {
 let windowsInfo=await chrome.windows.getAll({populate:true})
 let tabsInfoAcrossWindows=windowsInfo.map((info) => info.tabs)
 //the windows info returns an array containing array of object of windows with properties such as tabs array 
 // like this structure 
 //let tabInfoAcrossWindows=[[{},{}],[{},{}]] 
 let mergedTabInfo=tabsInfoAcrossWindows.flat(Infinity)
 console.log("merged tabinfo is",mergedTabInfo);
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




function GetallTab()
{
// we gather active and unactivve tabs info first  
//after that we try to create some tab which info we don,t have in our alltabpromise 
let alltabsPromise=getCurrentTab()
        
//assuming in past we have custom profiles with object info within in array
let AllsavedProfiles;
getProfileData("AllProfiles").then(
    (userProfiles) => {
        console.log("user profiles are",userProfiles);
        
        AllsavedProfiles=userProfiles["AllProfiles"]
        for(let currentTabUrlObject of AllsavedProfiles)
{          
    if(currentTabUrlObject["isActive"])
    {         

               //creating current profile object to retrive its keys to access all customo url of each profile
            let currentProfile=Object.keys(currentTabUrlObject)
            //creating another loop to iterate overl all links
            let currentProfileArray=currentTabUrlObject[currentProfile[0]]
            for(let currentUrlObject of currentProfileArray)
            {                
               chrome.tabs.create(
                currentUrlObject
                ).then(() => console.log('tab is created')
            ).catch((error) => console.error(error)
        )
            }
    }
}
        
    }
).catch(
    (error)  => {
        console.log("error happended",error);
        
    }
)


alltabsPromise.then(
    (restultofAlltab) => 
        {   
            console.log("the all tab are now at this time",restultofAlltab);
            
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
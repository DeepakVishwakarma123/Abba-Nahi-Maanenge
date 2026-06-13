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
  }
});



function GetallTab()
{
// we gather active and unactivve tabs info first  
//after that we try to create some tab which info we don,t have in our alltabpromise 
let alltabsPromise=getCurrentTab()

 chrome.tabs.create(
            {
                url:"https://instagram.com/whileddia"
            }).then(() => console.log('tab is created')
            ).catch(() => console.error('error occured')
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
    // let dateObject=new Date()
    //current time in milliseconds
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

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

// the below code returns all active window and there info regarding tabs property and other thins

let windowPromise=chrome.windows.getAll(
{
    populate:true,
}
)

windowPromise.then(
    (windowInfo) => console.log(windowInfo)
).catch(() => console.error('there are some errors'))

async function getCurrentTab(params) {
    let queryOptions={active:false,lastFocusedWindow:true}
    let tab=await chrome.tabs.query(queryOptions)
    console.log(tab);
    
    return tab
}

getCurrentTab()
// async function  always return promise we cautious while using it

chrome.commands.onCommand.addListener((command) => {
  if(command==="panic-key")
  {
    GetallTab()
  }
});



function GetallTab()
{
let alltabsPromise=getCurrentTab()
alltabsPromise.then(
    (restultofAlltab) => 
        {   
            console.log("the all tab are now at this time",restultofAlltab);
            
            let AlltabId=restultofAlltab.map(
                (tabInfo) => tabInfo.id 
            )
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
        chrome.tabs.create(
            {
                url:"https://instagram.com/whileddia"
            }
        ).then(
            (data) => console.log('tab is created')
        ).catch(
            () => console.error('error occured')
        )
    }
).catch(
    (err) => console.error('something went wrong')
)
}
// chrome.runtime.onInstalled.addListener(({reason}) => {
//   if (reason === 'install') {
//     chrome.tabs.create({
//       url: "onboarding.html"
//     });
//   }
// });


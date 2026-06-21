// hook for saving data to local storage

let devProfile=[
    {
        url:"https://github.com"
    },
    {
      url:"https://behance.com"
    },
    {
        url:"https://wikipedia.com"
    }
]


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
        console.log("saved Profiles are",savedProfile);
        
        return savedProfile
    } catch (error) {
        return "Error At Retrival"
    }
}


export {saveProfileToLocal,devProfile,getProfileData}
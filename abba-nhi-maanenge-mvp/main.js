  let buttonSetting=document.querySelector("#buttonSetting")
  let closeButton=document.querySelector("#closeButton")

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

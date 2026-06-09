function findtotalReadingTime()
{
    let article=document.querySelector("article")
    if(article)
    {
        let articleText=article.textContent
        let totallength=articleText.length
        let totalReadingTime=Math.round(totallength/200)
        let p=document.createElement("h1")
        console.log(articleText)
        p.classList.add("color-secondary-text", "type--caption");
        p.textContent=`total reading time is ${totalReadingTime}`
        article.insertAdjacentElement("beforebegin",p)
    }
    return
}

findtotalReadingTime()
//Marvel public key: cb3b25f720176b2bd601bd75a6e726ee
//private key: 9b8e624da81b42d30c70e1fdb4aac6492d738c8e
//domain: developer.marvel.com
//Don't worry about doing a put patch or post request
//reqbin.com to test api requests

import {getNasaData,apiKey,formatDate} from "./module.mjs";
const nasaCard = document.getElementById("nasa_card")

document.addEventListener("DOMContentLoaded",async ()=>{
    nasaCard.classList.add("enter");
    document.body.classList.add("fade_in")
    let iod = document.getElementById("imgOfDay")
    let date = formatDate()
    let data = await getNasaData(apiKey,date);
    iod.src = data.hdurl
    let txtOD = document.getElementById("explanation")
    txtOD.textContent = data.explanation
    let imgT = document.getElementById("imgTitle");
    imgT.textContent = data.title

    nasaCard.addEventListener("animationend",async()=>{
        
        document.body.classList.remove("fade_in")
        nasaCard.classList.remove("enter")
        nasaCard.classList.add("hovering")
    })
})
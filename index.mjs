//Marvel public key: cb3b25f720176b2bd601bd75a6e726ee
//private key: 9b8e624da81b42d30c70e1fdb4aac6492d738c8e
//domain: developer.marvel.com
//Don't worry about doing a put patch or post request
//reqbin.com to test api requests

import {getNasaData,apiKey,formatDate} from "./module.mjs";

let changeDate = new Date();
document.addEventListener("DOMContentLoaded",async ()=>{
    const nasaCard = document.getElementById("nasa_card");
    const flip = document.getElementById("flip");
    const left = document.getElementById("left");
    const right = document.getElementById("right");

    nasaCard.classList.add("enter");
    document.body.classList.add("fade_in")
    let iod = document.getElementById("imgOfDay")
    let date = formatDate()
    let changeDateString = formatDate(changeDate)
    let data = await getNasaData(apiKey,date);
    let currentDate = new Date()
    iod.src = data.hdurl
    let txtOD = document.getElementById("explanation")
    txtOD.textContent = data.explanation
    let imgT = document.getElementById("imgTitle");
    imgT.textContent = data.title
    
    right.style.opacity = "0.4";
    nasaCard.addEventListener("animationend",async()=>{
        document.body.classList.remove("fade_in")
        nasaCard.classList.remove("enter")
        nasaCard.classList.add("hovering")

        flip.addEventListener("click",async (event)=>{  
            if (changeDate>=currentDate){
                right.style.opacity = 0.4;
            }
            if(event.target.tagName === "I"){
                if(event.target.id == "left"){
                        changeDate.setDate(changeDate.getDate()-1)
                        changeDateString = formatDate(changeDate)
                        console.log("change: "+ changeDate)
                        data = await getNasaData(apiKey,changeDateString);

                        nasaCard.classList.add("stageRight")
                        nasaCard.classList.remove("stageRight") 
                        
                    
                        
                        right.style.opacity = 1
                        if(data){

                            if(!data.hdurl){
                                iod.src = ""
                                iod.alt ="image not availible"
                            }else{
                                iod.src= data.hdurl
                                iod.alt = data.hdurl
                                txtOD = document.getElementById("explanation")
                                txtOD.textContent = data.explanation
                                imgT = document.getElementById("imgTitle");
                                imgT.textContent = data.title 
                            }
                        
                        }else{
                            console.log("No data could be extracted")
                        }
                    
                }
        
                if(event.target.id == "right"){
                    if (changeDate>=currentDate){
                        right.style.opacity = 0.4;
                    }
                    
                    
                    
                    if ( changeDate >= currentDate){
                        
                        right.style.opacity = 0.4;
                        changeDate = new Date()
                        changeDateString = formatDate(changeDate)
                        data = await getNasaData(apiKey,changeDateString);
                        right.style.opacity = 1;
                        if(data){

                            if(!data.hdurl){
                                iod.src = ""
                                iod.alt ="image not availible"
                            }else{
                            iod.src = data.hdurl
                            iod.alt = data.hdurl
                            txtOD = document.getElementById("explanation")
                            txtOD.textContent = data.explanation
                            imgT = document.getElementById("imgTitle");
                            imgT.textContent = data.title 
                            }
                           
                        }else{
                            console.log("No data could be extracted")
                        }
                    }else{
                        //nasaCard.classList.add("stageLeft");
                        right.style.opacity = 1;
                        changeDate.setDate(changeDate.getDate()+1)
                        console.log("change: "+ changeDate)
                        changeDateString = formatDate(changeDate)
                        data = await getNasaData(apiKey,changeDateString);
                        
                        if(data){

                            if(!data.hdurl){
                                iod.src = ""
                                iod.alt ="image not availible"
                            }else{
                            iod.src = data.hdurl
                            iod.alt = data.hdurl
                            txtOD = document.getElementById("explanation")
                            txtOD.textContent = data.explanation
                            imgT = document.getElementById("imgTitle");
                            imgT.textContent = data.title 
                            }
                           
                        }else{
                            console.log("No data could be extracted")
                        }
                    }
                    
                    

                    
                }
            }     
        })




    })



    
})
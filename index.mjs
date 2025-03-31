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
    const time = document.getElementById("time")

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
    time.textContent = changeDateString;

    //handling cases if NASA hasnt uploaded a new APOD in time when the user requests.(e.g. at midnight) ;
    if(data){
        if(!data.hdurl){
            iod.src = ""
            iod.alt ="image not availible"
            txtOD = document.getElementById("explanation")
            txtOD.textContent = data.explanation
            imgT = document.getElementById("imgTitle");
            imgT.textContent = data.title 
            time.textContent = changeDateString;
        }else{
            iod.src = data.hdurl
            iod.alt = data.hdurl
            txtOD = document.getElementById("explanation")
            txtOD.textContent = data.explanation
            imgT = document.getElementById("imgTitle");
            imgT.textContent = data.title 
            time.textContent = changeDateString;
        }
    }else{
        iod.src = ""
        iod.alt ="image not available"
        txtOD.textContent = "APOD is in the works...."
        imgT.textContent = "TBA"
        time.textContent = changeDateString;
    }

    //setting right button to a disabled style since we cant search for APOD in the future
    right.style.opacity = "0.4";
    nasaCard.addEventListener("animationend",async()=>{
        document.body.classList.remove("fade_in")
        nasaCard.classList.remove("enter")
        nasaCard.classList.add("hovering")
        right.style.opacity = "0.4";
        flip.addEventListener("click",async (event)=>{  
            //targeting the icon class which has the arrows
            if(event.target.tagName === "I"){
                //we use the functions(explained in module.mjs) to set the date and use it in getNasaData which uses the fetch method
                if(event.target.id == "left"){
                        changeDate.setDate(changeDate.getDate()-1)
                        changeDateString = formatDate(changeDate)
                        console.log("change: "+ changeDate)
                        data = await getNasaData(apiKey,changeDateString);
 
                        right.style.opacity = 1
                        if(data){

                                if(!data.hdurl){
                                    iod.src =  "";
                                    iod.alt = "Image is not availible"
                                }else{
                                    iod.src=  data.hdurl
                                    iod.alt = data.hdurl
                                }
                                
                                txtOD = document.getElementById("explanation")
                                txtOD.textContent = data.explanation
                                imgT = document.getElementById("imgTitle");
                                imgT.textContent = data.title 
                                time.textContent = changeDateString;
                        
                        
                        }else{
                            console.log("No data could be extracted")
                        }
                    
                }else
        
                if(event.target.id == "right"){
                
                    //if the date that has changed is set to the same date as today; we disable going 
                    //right setting the opacity to 0.4
                    if ( changeDateString === formatDate()){
                        
                        right.style.opacity = 0.4;
                        
                    }else{
                            //else we use the functions(explained in module.mjs) to set the date and use it in  fetch
                            changeDate.setDate(changeDate.getDate()+1)
                            console.log("change: "+ changeDate)
                            changeDateString = formatDate(changeDate)
                            data = await getNasaData(apiKey,changeDateString);

                            if (changeDateString === formatDate()) {
                                right.style.opacity = "0.4"; // Disable right button
                            } else {
                                right.style.opacity = "1"; // Enable right button if not on current date
                            }
                            
                            if(data){

                                if(!data.hdurl){
                                    iod.src = ""
                                    iod.alt ="image not available"
                                    txtOD = document.getElementById("explanation")
                                    txtOD.textContent = data.explanation
                                    imgT = document.getElementById("imgTitle");
                                    imgT.textContent = data.title 
                                    time.textContent = changeDateString;
                                }else{
                                    iod.src = data.hdurl
                                    iod.alt = data.hdurl
                                    txtOD = document.getElementById("explanation")
                                    txtOD.textContent = data.explanation
                                    imgT = document.getElementById("imgTitle");
                                    imgT.textContent = data.title 
                                    time.textContent = changeDateString;
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
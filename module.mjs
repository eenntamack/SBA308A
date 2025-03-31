const apiKey =  'rieB0eYfKcvuQnMQ8wFJnUZqNJhmlUPnTFvjYIhg';

//here i return the required fomrmat NASA needs for APOD api when searching by date yyyy-mm-dd
function formatDate(date = new Date()) {
    //Thought it would be best to set the user's time zone when formatting the date from UST to user's comp. time zone
    const year = date.toLocaleString('en-US',{year:'numeric'});//e.g. 2001
    const month = date.toLocaleString('en-US',{month:'2-digit'})//e.g. 03
    const day = date.toLocaleString('en-US',{day:"2-digit"})//e.g. 27
    return `${year}-${month}-${day}`;
}


const date = formatDate()

async function getNasaData(apiKey,date){
    //here I used a try and catch to make sure data is returned otherwise return null 
    try{
        const data = {};
        const nasaFetch = await fetch(`https://api.nasa.gov/planetary/apod?&date=${date}&api_key=${apiKey}`)
        const jsonData = await nasaFetch.json()
        data.title = jsonData.title
        data.explanation = jsonData.explanation
        data.hdurl = jsonData.hdurl
        return data;    
    }catch{
        console.log( "could not fetch nasa data")
        return
    }
}


//exported functions and the apikey I used
export{ getNasaData , apiKey , formatDate};